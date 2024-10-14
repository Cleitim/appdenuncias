const db = require("../database/conexao");

class denunciaModel{

    static async getDenuncias()
    {

        return new Promise ( resolve =>{
            db.query("select * from denuncias",[],(error,result)=>{
                if(!error){
                    resolve(result);
                }
            })
        })
    }

    static async addDenuncia(dados,nameImg)
    {
        
        const city = dados.city;
        const state = dados.state;
        const address = dados.address;
        const zipcode = dados.cep;
        const description = dados.description;
        const image = nameImg;
        
        return new Promise(resolve => {
            db.query("INSERT into denuncias (city,state,address,zipcode,description,image) values (?,?,?,?,?,?)",
                [city,state,address,zipcode,description,image],
                (e,r)=>{
                if(!e){
                    resolve(true);
                }else{
                    console.log(e);
                    resolve(false);
                }
              
            })
        })
        
    }
}

module.exports = denunciaModel;