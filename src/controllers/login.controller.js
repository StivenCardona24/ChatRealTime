import { getConnection } from "../database/database";

const login = async (req, res) =>{
    const connection = await getConnection();
    const {email, password} = req.body;
    console.log('contrasenña',password);
    const sql = `SELECT * FROM Person WHERE email = '${email}'`;
    
    await connection.query(sql, (error, results)=>{
        if(error){
            res.status(500);
            res.send(error);
        }
        else if(results.length > 0){
            let person = results[0];
            console.log('login', results[0]);
            if(password == person.password){
                res.status(200).json({message: "Login successfully", login: person});
            }
            else{
                res.status(200).json({message: "Incorrect Password"})
            }
        }
        else{
            res.status(200).json({message:"Wrong email or password"})
        }
    });
    
};



module.exports = {

    login,

}

