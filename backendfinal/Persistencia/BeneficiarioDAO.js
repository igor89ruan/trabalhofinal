import conectar from "./Conexao.js";
import Beneficiario from "../Modelo/Beneficiario.js";

export default class BeneficiarioDAO{
    async gravar(beneficiario){
        if (beneficiario instanceof Beneficiario){
            const conexao = await conectar();
            const sql = `INSERT INTO beneficiario (nome, cpf, contato, endereco, bairro, numero, datanascimento
                         ) 
                         values (?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                beneficiario.nome,
                beneficiario.cpf,
                beneficiario.contato,
                beneficiario.endereco, 
                beneficiario.bairro,
                beneficiario.numero,
                beneficiario.datanascimento,
            ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            beneficiario.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(beneficiario){
        if (beneficiario instanceof Beneficiario){
            const conexao = await conectar();
            const sql = `UPDATE beneficiario SET nome = ?,
                         cpf = ?, contato = ?, endereco = ?, bairro = ?, numero = ?, datanascimento = ?
                         WHERE id = ?`;
            const parametros = [
                beneficiario.nome,
                beneficiario.cpf,
                beneficiario.contato,
                beneficiario.endereco,
                beneficiario.bairro,
                beneficiario.numero,
                beneficiario.datanascimento,
                beneficiario.codigo
            ];

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(beneficiario){
        if (beneficiario instanceof Beneficiario){
            const conexao = await conectar();
            const sql = `DELETE FROM beneficiario WHERE id = ?`;
            const parametros = [
                beneficiario.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }

    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(parseInt(termoDePesquisa))){ //termo de pesquina não é um número
            sql = `SELECT * FROM beneficiario WHERE nome LIKE ?`; //like será um parametro
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM beneficiario WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql,[termoDePesquisa]);
        //Utilizar os registros encontrados para criar novos objetos do tipo cliente
        let listaBeneficiario = [];
        for (const registro of registros){
            const beneficiario = new Beneficiario(
                registro.id,
                registro.nome,
                registro.cpf,
                registro.contato,
                registro.endereco,
                registro.bairro,
                registro.numero,
                registro.datanascimento
            );
            listaBeneficiario.push(beneficiario);
        }
        return listaBeneficiario;
    }

}