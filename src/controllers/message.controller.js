import { getConnection } from "../database/database";
import { getChannel } from "../database/rabbit";

const addMessage = async (req, res) =>{
    const connection = await getConnection();
    const sql = "INSERT INTO message SET ?";
    const {id_chat, message, id_personSend} = req.body;
    const newMessage = {
        id_chat, message, id_personSend
    }
    await connection.query(sql,newMessage, (error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            createQueue(newMessage, `chat${newMessage.id_chat}`)
            res.status(200).json({message: "Mensaje creado"});

        }
    });
    
};


const deleteMessage = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const sql = `DELETE FROM Message WHERE id = ${id}`;
    await connection.query(sql, (error, result)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.send(`Mensaje con ${id} eliminado`)
        }
    });
    
};


async function createQueue(msgs, queue){
    const channel = await getChannel();

    const res = await channel.assertQueue(queue);
    console.log("Queue Created...");

        await channel.sendToQueue(queue, Buffer.from(JSON.stringify(msgs)))
        console.log(`Message sent to queue ${queue}`);

}


module.exports = {

    addMessage,
    deleteMessage

}

