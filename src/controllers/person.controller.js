import { getConnection } from "../database/database";

const getPerson = async (req, res) => {
    const connection = await getConnection();
    const sql = 'SELECT * FROM Person';
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

const getOnePerson = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const sql = `SELECT * FROM Person WHERE id = ${id}`;
    await connection.query(sql, (error, result)=>{
        if(error){
            res.status(500);
            res.send(error);
        };
        if(result.length > 0){
            res.status(200).json(result);
        }
        else{
            res.send(`No hay una persona con el id ${id}`)
        }
    });
    
};

const addPerson = async (req, res) =>{
    const connection = await getConnection();
    const {name, email, password} = req.body;
    const sql = "INSERT INTO Person SET ?";
    const person = {
        name, email, password
    }
    await connection.query(sql,person, (error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.status(200).json({message: "Persona creada"})
        }
    });
    
};


const updatePerson = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const {name, email, password} = req.body;

    const person = {
        name, email, password
    }
    //const sql = `UPDATE ciudades SET nombre ="${nombre}", departamento = ${departamento}  WHERE id = ${id}, 
    const sql = "UPDATE Person SET ? WHERE id = ?"

    await connection.query(sql, [person, id] ,(error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.status(200).json({message: "Persona Actualizada"})
        }
    });
    
};


const deletePerson = async (req, res) =>{
    const connection = await getConnection();
    const { id } = req.params;
    const sql = `DELETE FROM Person WHERE id = ${id}`;
    await connection.query(sql, (error, result)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else{
            res.send(`Persona con ${id} eliminada`)
        }
    });
    
};

module.exports = {
    getPerson,
    getOnePerson,
    addPerson,
    updatePerson,
    deletePerson

}

