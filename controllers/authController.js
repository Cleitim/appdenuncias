const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const bd = require('../database/conexao');
const {promisify} = require('util');

exports.register = async (req,res)=>{

    try {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        let passHash = await bcryptjs.hash(password, 8);

        bd.query('INSERT into users (name,email,password) values (?,?,?)',[name,email,passHash],(error,results)=>{
            if(error){
                console.log(error);
            }
            res.render('register',{
                alert:true,
                alertTitle:"Bem Vindo,",
                alertMessage:"Cadastro Realizado com Sucesso, Faça login e cadastre sua denuncia",
                alertIcon:'success',
                showConfirmButton:true,
                timer: 8000,
                ruta:'login'
            })
            //res.redirect('/');
        });
        
    } catch (error) {
        console.log(error)    
    }

}

exports.login = async (req,res)=>{
    try {
       const email = req.body.email;
       const password = req.body.password;

       if( !email || !password){
            res.render('login',{
                alert:true,
                alertTitle:"Aviso",
                alertMessage:"Por favor Digite um usuário e senha",
                alertIcon:'info',
                showConfirmButton:true,
                timer: false,
                ruta:'login'
            })
       }else{
         bd.query('SELECT * FROM users WHERE email = ?',[email], async (error,results)=>{
            if(results.length == 0 || ! (await bcryptjs.compare(password,results[0].password))){
                res.render('login',{
                    alert: true,
                    alertTitle:"Aviso",
                    alertMessage:"Usuário ou senha incorreta!",
                    alertIcon:'info',
                    showConfirmButton: true,
                    timer: false,
                    ruta:'login'
                })
            }else{
                //inicio de sessão
                const id = results[0].id;
                const token = jwt.sign({id:id}, process.env.JWT_SECRETA,{
                    expiresIn: process.env.JWT_TEMPO_EXPIRA
                })

                console.log("TOKEN" +token+" usuario "+email );

                const cookieOptions = {
                    expires: new Date(Date.now()+process.env.JWT_COOKIE_EXPIRES * 24 * 60 *60 * 1000),
                    httpOnly: true
                }
                res.cookie('jwt',token, cookieOptions);
               
                res.render('login',{
                    
                    alert: true,
                    alertTitle:"Bem Vindo,",
                    alertMessage: email,
                    alertIcon:'success',
                    showConfirmButton: false,
                    timer: 2000,
                    ruta:'blog'
                })
            }
         })
       }

    } catch (error) {
        console.log(error);
    }
}

exports.isAuthenticated = async (req,res,next)=>{
    if(req.cookies.jwt){
        try {
            const decofition = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETA);
            bd.query('SELECT * FROM users WHERE id = ?',[decofition.id], (erro,results)=>{
                if(!results){return next()}
                
                req.email = results[0];
                return next();
            })
        } catch (error) {
            console.log(error);
            return next();
        }
    }else{
        res.redirect('/login');
    }
}

exports.logout = (req, res)=>{
    res.clearCookie('jwt');
    return res.redirect('/');
}