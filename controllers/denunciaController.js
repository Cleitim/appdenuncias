const DenunciaModel = require("../models/denunciaModel");
const auth = require("../controllers/authController");

const fs = require('fs');
const multer = require('multer');



class DenunciaController{

    static async getAddDenuncia(_req, res)
    {
        res.render("add_denuncias",{ user : _req.email ,title: "Cadastrar Denuncia" });

    }


    static async getalldenuncias(_req, res)
    {

       var results =await DenunciaModel.getDenuncias();
        
       if(results){
        res.render("index",{ user : _req.email , title: "Blog Denuncias", result : results });
       }
    }
    
    static async getmydenuncias(_req, res)
    {

       var results =await DenunciaModel.getDenuncias();
        
       
       if(results){
        res.render("denuncias",{ user : _req.email ,title: "Minhas Denuncias", result : results });
       }
    }

    static async addnewdenuncia(req,res)
    {   

        var dados = req.body;
        var nameImg = req.file.filename;
        var x=await DenunciaModel.addDenuncia(dados,nameImg);
        if( x == true){
            res.render("add_denuncias",{ user : req.email ,title: "Cadastro de Denuncias",
              message : "Denuncia Cadastrada com sucesso!",
              success : "success" 
             });
        }else{
          res.render("add_denuncias",{ user : req.email ,title: "Cadastro de Denuncias",
            message : "Falha ao Cadastrar a Denuncia!",
            success : "danger" 
           });
        }
    }
}

module.exports = DenunciaController;