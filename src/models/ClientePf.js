import conexao from "../conexao.js";
import Cliente from "./Cliente.js";

class ClientePf extends Cliente{

    constructor(dados) {
        super(dados)
        this.nome = dados.nome;
        this.nomeSocial = dados.nome_social;
        this.dataNascimento = dados.data_nascimento;
        this.estadoCivil = dados.estado_civil;
        this.sexo = dados.sexo;
        this.cpf = dados.cpf;
        this.rg = dados.rg;
        this.profissao = dados.profissao;
        this.rendaBrutaMensal = dados.renda_bruta_mensal
    }

    formarArray(id) {
        return [
            this.id = id,
            this.nome,
            this.nomeSocial,
            this.dataNascimento,
            this.estadoCivil,
            this.sexo,
            this.cpf,
            this.rg,
            this.profissao,
            this.rendaBrutaMensal
        ]
    }

    static async cadastrar(dadosCliente) {
        const sql = `INSERT INTO pessoas_fisicas (
        id,
        nome,
        nome_social,
        data_nascimento,
        estado_civil,
        sexo,
        cpf,
        rg,
        profissao,
        renda_bruta_mensal
        ) VALUES (
         ?,?,?,?,?,?,?,?,?,?)`;

        try {
            const clientePf = new ClientePf(dadosCliente)
            const id = await super.cadastrar(dadosCliente)
            const array = clientePf.formarArray(id);
            const [resultado] = await conexao.execute(sql, array);

            return {sucesso: true, statusCod:201, resultado};
        } catch (erro) {
            switch (true) {
                case erro.errno === 1062:
                    return {sucesso: false, statusCod:409, campo: "cpf", mensagem: "Cpf já cadastrado para outro cliente" };
                case erro.errno === 1048:
                    return {sucesso: false, statusCod:400, mensagem: "Preencha todos os campos obrigatorios" };
                default : console.error(erro)
            }
        }
    }
}

export default ClientePf;