import Beneficiario from "../Modelo/Beneficiario.js";

export default class BeneficiarioCtrl{
    
    gravar(requisicao, resposta){
       
        resposta.type('application/json');

       
        if(requisicao.method === "POST" && requisicao.is('application/json')){
            const dados = requisicao.body; 
            const nome = dados.nome;
            const cpf = dados.cpf;
            const contato = dados.contato;
            const endereco = dados.endereco;
            const bairro = dados.bairro;
            const numero = dados.numero;
            const datanascimento = dados.datanascimento;

            
            if (nome && cpf && contato && endereco && bairro && numero && datanascimento){
                const beneficiario = new Beneficiario(0, nome, cpf, contato, endereco, bairro, numero, datanascimento);
                beneficiario.gravar().then(()=>{  
                    resposta.status(201);
                    resposta.json({
                        "status":true,
                        "mensagem": "Beneficiario gravado com sucesso!",
                        "codigo_beneficario": beneficiario.codigo
                    })
                })
                .catch((erro) =>{
                    resposta.status(500);
                    resposta.json({
                        "status":false,
                        "mensagem": "Não foi possível armazenar o beneficiario!" + erro.message
                    })
                });
            }
            else{
                resposta.status(400);
                resposta.json({
                    "status":false,
                    "mensagem": "Favor informar todos os dados do Beneficiario, conforme documentação da API"
                });
            }   
      }
      else{
        resposta.status(400);
        resposta.json({
            "status":false,
            "mensagem": "Requisição inválida! Esperando o método POST e dados no formato JSON, para gravar um Beneficiario!"
        })
      }
  }

     atualizar(requisicao, resposta){
    resposta.type('application/json');
    if ((requisicao.method === "PATCH" || requisicao.method === "PUT") && requisicao.is('application/json')){
        const dados = requisicao.body; 
        const codigo = requisicao.params.codigo;
        const nome = dados.nome;
        const cpf = dados.cpf;
        const contato = dados.contato;
        const endereco = dados.endereco;
        const bairro = dados.bairro;
        const numero = dados.numero;
        const datanascimento = dados.datanascimento;
        if (codigo && codigo > 0 && nome && cpf && contato && endereco && bairro && numero && datanascimento )
        {
            const beneficiario = new Beneficiario(codigo, nome, cpf, contato, endereco, bairro, numero, datanascimento);
            beneficiario.atualizar()
            .then(()=>{
                resposta.status(200);
                resposta.json({
                    "status":true,
                    "mensagem": "Beneficiario atualizado com sucesso!!",
                })
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível atualizar o Beneficiario!!" + erro.message
                })
            });
        }
        else{
            resposta.status(400);
            resposta.json({
                "status":false,
                "mensagem": "Informe todos os dados do Beneficiario, conforme documentação da API"
            })
        }
    }
    else{
        resposta.status(405);
        resposta.json({
            "status":false,
            "mensagem": "Requisição inválida! Esperando o método PATCH"
        })
    }
}

    excluir(requisicao, resposta){
    resposta.type('application/json');
    if (requisicao.method === "DELETE"){
        const codigo = requisicao.params.codigo;
        if (codigo && codigo > 0){
            const beneficiario = new Beneficiario(codigo);
            beneficiario.excluir()
            .then(()=>{
                resposta.status(200);
                resposta.json({
                    "status":true,
                    "mensagem": "Beneficiario excluído com sucesso!!",
                })
            })
            .catch((erro) =>{
                resposta.status(500);
                resposta.json({
                    "status":false,
                    "mensagem": "Não foi possível excluir o beneficiario!!" + erro.message
                })
            })
        }
        else{
            resposta.status(400);
            resposta.json({
                "status":false,
                "mensagem": "Favor informar o código do beneficiario que deseja excluir conforme documentação da API"
            })
        }
    }
    else{
        resposta.status(405);
        resposta.json({
            "status":false,
            "mensagem": "Requisição inválida. Favor usar o método DELETE para excluir um beneficiario"
        })
    }
}

consultar(requisicao, resposta){
    resposta.type('application/json');
    if (requisicao.method === "GET"){
        const termoDePesquisa = requisicao.params.termo;
        const beneficiario = new Beneficiario(0);
        beneficiario.consultar(termoDePesquisa)
        .then((beneficiarios)=>{
            resposta.status(200);
            resposta.json(beneficiarios);
        })
        .catch((erro) =>{
            resposta.status(500);
            resposta.json({
                "status":false,
                "mensagem": "Não foi possível consultar os beneficiarios" + erro.message
            })
        })
    }
    else{
        resposta.status(405);
        resposta.json({
            "status":false,
            "mensagem": "Requisição inválida. Aguardando método GET para consulta."
        })
    }
}
}