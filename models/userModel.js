const db = require("../database/conexao");

class UserModel{

    static async getUsers()
    {

        return new Promise ( resolve =>{
            db.query("select * from users",[],(error,result)=>{
                if(!error){
                    resolve(result);
                }
            })
        })
    }

    static async adduser(name, email, pass)
    {
    
        return new Promise(resolve => {
            db.query("INSERT into users (name,email,password) values (?,?,?)",[name,email,pass],(e,r)=>{
                if(!e){
                    resolve(true);
                }else{
                    resolve(false);
                }
              
            })
        })
    }
}

module.exports = UserModel;