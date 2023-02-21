import { getConnection } from "../database/database";

const getChat = async (req, res) => {
    const connection = await getConnection();
    const sql = 'SELECT * FROM Chat';
    await connection.query(sql, (error, results) => {
        if(error){
            res.status(500);
            res.send(error);
        };
        if(results.length > 0){
            res.status(200).json(results);
        }
        else{
            res.send("Not results")
        }
    });
};

const getOneChat = async (req, res) =>{
    const connection = await getConnection();
    const {id_person1, id_person2} = req.body;
    const sql = `SELECT c.id, m.message, m.id_personSend  
                FROM  chat c JOIN message m on m.id_chat = c.id
                WHERE (c.id_person1 = ${id_person1} AND  c.id_person2 = ${id_person2}) OR
                (c.id_person1 = ${id_person2} AND  c.id_person2 = ${id_person1});`;
    await connection.query(sql, (error, result)=>{
        if(error){
            res.status(500);
            res.send(error);
        };
        if(result.length > 0){
            res.status(200).json(result);
        }
        else{
            res.send(`No hay un chat con el id ${id}`)
        }
    });
    
};

const addChat = async (req, res) =>{
    const connection = await getConnection();
    const {id_person1, id_person2} = req.body;
    const sql = "INSERT INTO Chat SET ?";
    const chat = {
        id_person1, id_person2
    }
    await connection.query(sql,chat, (error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.status(200).json({message: "Chat creado"})
        }
    });
    
};


const updateChat = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const {id_person1, id_person2} = req.body;

    const chat = {
        id_person1, id_person2
    }
    //const sql = `UPDATE ciudades SET nombre ="${nombre}", departamento = ${departamento}  WHERE id = ${id}, 
    const sql = "UPDATE Chat SET ? WHERE id = ?"

    await connection.query(sql, [chat, id] ,(error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.status(200).json({message: "Chat Actualizado"})
        }
    });
    
};


const deleteChat = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const sql = `DELETE FROM Chat WHERE id = ${id}`;
    await connection.query(sql, (error, result)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.send(`Chat con ${id} eliminado`)
        }
    });
    
};



module.exports = {
    getChat,
    getOneChat,
    addChat,
    updateChat,
    deleteChat

}

