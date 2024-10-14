const userModel = require("../models/userModel");

class UserController{


    static async getalluser(req, res)
    {
       var results =await userModel.getUsers();

       if(results){
        res.render("index",{ title: "Home Page", result : results });
       }
    }
    
    static async addnewuser(req,res)
    {
        console.log(req.body);
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password
        var x=await userModel.adduser(name,email,password)
        if( x == true){
            res.render("index",{ title: "Home Page", message : "Cadastrado com sucesso!" });
        }else{
            res.send("falha ao adiconar usuário");
        }
    }
}

module.exports = UserController;