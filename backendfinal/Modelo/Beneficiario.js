

import BeneficiarioDAO from "../Persistencia/BeneficiarioDAO.js";

export default class Beneficiario {
    
    #codigo;
    #nome;
    #cpf;
    #contato;
    #endereco;
    #bairro;
    #numero;
    #datanascimento;

    constructor(codigo=0, nome="", cpf="", contato="", endereco="", bairro="", numero="", datanascimento="") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#cpf = cpf;
        this.#contato = contato;
        this.#endereco = endereco;
        this.#bairro = bairro;
        this.#numero = numero;
        this.#datanascimento = datanascimento;
    }

    get codigo(){
        return this.#codigo;
    }

    set codigo(novoCodigo){
        this.#codigo = novoCodigo;
    }

    get cpf(){
        return this.#cpf;
    }

    set cpf(novoCpf){
        this.#cpf = novoCpf;
    }

    get nome(){
        return this.#nome;
    }

    set nome(novoNome){
        this.#nome = novoNome;
    }

    get contato(){
        return this.#contato;
    }

    set contato(novoContato){
        this.#contato = novoContato;
    }

    get endereco(){
        return this.#endereco;
    }

    set endereco(novoEndereco){
        this.#endereco = novoEndereco;
    }

    get bairro(){
        return this.#bairro;
    }

    set bairro(novoBairro){
        this.#bairro = novoBairro;
    }

    get numero(){
        return this.#numero;
    }

    set numero(novoNumero){
        this.#numero = novoNumero;
    }

    get datanascimento(){
        return this.#datanascimento;
    }

    set datanascimento(novoDatanascimento){
        this.#datanascimento = novoDatanascimento;
    }

    async gravar(){
        const dao = new BeneficiarioDAO();
        await dao.gravar(this); 
    }

    async atualizar(){
        const dao = new BeneficiarioDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new BeneficiarioDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new BeneficiarioDAO();
        return await dao.consultar(termoDePesquisa);
    }

    toString(){
        return `Beneficiario código: ${this.#codigo} -  nome: ${this.#nome}`;
    }

    toJSON(){
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "cpf": this.#cpf,
            "contato": this.#contato,
            "endereco": this.#endereco,
            "bairro": this.#bairro,
            "numero": this.numero,
            "datanascimento": this.datanascimento
        }
    }
}