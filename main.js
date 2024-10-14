require("dotenv").config();
const express = require('express');
const session = require('express-session');
const bd = require('./database/conexao');
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

const PORT = process.env.PORT || 3000;

// verificar conexao com o  Banco de Dados
bd.connect(function(err){
    if(err){
        console.log("erro ao conectar ao banco de dados");
    }else{
        console.log("Conexão estabelecida, com o Banco de Dados!")
    }
});

//middlewres
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("uploads"));


app.use(express.static("public"));

app.set('view engine', 'ejs');

app.use("", require("./routes/routes"));

app.listen(PORT,()=>{
    console.log(`Server iniciado na porta http://localhost:${PORT}`);
});