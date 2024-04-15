
import Beneficiario from "./Modelo/Beneficiario.js";


// const beneficiario = new Beneficiario(2, "Willian", 
// "788-113-047-99", "(18)99574-9999", "Rua Joana", "Jardim Por do sol", "275", "20/01/1977");

// console.log(beneficiario.toJSON());



// beneficiario.gravar().then(() =>{
//     console.log("Beneficiario gravado com sucesso!");
// }).catch((erro) => {
//     console.log(erro);
// });



// beneficiario.atualizar().then(() =>{
//     console.log("Beneficiario atualizado com sucesso!");
// }).catch((erro) => {
//     console.log(erro);
// });



// beneficiario.excluir().then(() =>{
//     console.log("O beneficiario foi EXCLUÍDO!");
// }).catch((erro) => {
//     console.log(erro);
// });



// const beneficiarioQQ = new Beneficiario();

// beneficiarioQQ.consultar().then((listaBeneficiario) => {
//     console.log("beneficiarios encontrados foram:")
//     for (const beneficiario of listaBeneficiario) {
//         console.log(beneficiario.toJSON());
//     }
// }).catch((erro) => {
//     console.log("Não foi possível encontrar o beneficiario.", erro);
// });

import express from "express";
import rotaBeneficiario from "./Rotas/rotaBeneficiario.js";
import cors from "cors"


const host = '0.0.0.0';
const porta = 3000; 

const app = express();
app.use(cors({
    origin: '*'
}));

app.use(express.json()); 
app.use(express.urlencoded({ extended: true})); 

app.use('/cadastroBeneficiario',rotaBeneficiario);
app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});