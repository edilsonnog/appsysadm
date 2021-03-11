export class Alunos {
    id: Number | String;
    nome: String;
    cpf: String;
    rg: String;
    dataNascimento: String;
    cep: String;
    logradouro: String;
    complemento: String;
    bairro: String;
    localidade: String;
    uf: String;

    constructor() {
        this.id = '';
        this.nome='';
        this.cpf='';
        this.rg='';
        this.dataNascimento='';
        this.cep='';
        this.logradouro='';
        this.complemento='';
        this.bairro='';
        this.localidade='';
        this.uf='';
    }
}
