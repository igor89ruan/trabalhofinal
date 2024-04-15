import express from 'express';
import process from 'process';
import path from 'path';
import session from 'express-session';
import autenticar from './seguranca/autenticar.js';
import mysql from 'mysql2';



const host='0.0.0.0';
const porta = 5000; 

const app = express();

app.use(express.urlencoded({extended: true}));

app.use(session({
    secret: 's3nh4s3cr3t4',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60 * 1000 * 15
    }
}))

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'backendfinal_CB'
});

connection.connect((erro)=> {
    if (erro) {
        console.error('erro ao conectar com o banco de dados:', erro);
    }
    else{
        console.log('conexão com o banco de dados estabelecida com sucesso.')
    }
})

app.post('/login', (requisicao, resposta)=>{
    const usuario = requisicao.body.usuario;
    const senha = requisicao.body.senha;
    if (usuario && senha && usuario === 'eco' && senha === '123'){
        requisicao.session.usuarioLogado = true;
        resposta.redirect('./privado/cadastroBeneficiario.html');
    }
    else{
        resposta.redirect('/login.html');
    }
})



app.use(express.static(path.join(process.cwd(), 'publico')));

app.use(autenticar, express.static(path.join(process.cwd(), 'privado')));



app.listen(porta, host, ()=>{
    console.log(`Servidor escutando em http://${host}:${porta}`);
});