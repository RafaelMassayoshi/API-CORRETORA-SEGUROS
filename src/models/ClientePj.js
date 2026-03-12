import conexao from "../conexao.js"
import Cliente from "./Cliente.js"
class ClientePj extends Cliente {

    constructor(dados) {
        super(dados)
        this.razaoSocial = dados.razao_social
        this.nomeFantasia = dados.nome_fantasia
        this.cnpj = dados.cnpj
        this.codigoAtividadeEconomica = dados.codigo_atividade_economica
        this.ramoAtividade = dados.ramo_atividade
        this.dataAbertura = dados.data_abertura
        this.codigoNaturezaJuridica = dados.codigo_natureza_juridica
        this.descricaoNaturezaJuridica = dados.descricao_natureza_juridica

    }

    formarArray(id) {
        return [
            this.id = id,
            this.razaoSocial,
            this.nomeFantasia,
            this.cnpj,
            this.codigoAtividadeEconomica,
            this.ramoAtividade,
            this.dataAbertura,
            this.codigoNaturezaJuridica,
            this.descricaoNaturezaJuridica
        ]
    }

    static async cadastrar(dados) {
        const sql = `INSERT INTO pessoas_juridicas (
        id,
        razao_social,
        nome_fantasia,
        cnpj,
        codigo_atividade_economica,
        ramo_atividade,
        data_abertura,
        codigo_natureza_juridica,
        descricao_natureza_juridica
        ) VALUES (
         ?,?,?,?,?,?,?,?,?)`;

        const cliente = new ClientePj(dados);
        const retornoCadastro = await super.cadastrar(dados)
        const array = cliente.formarArray(retornoCadastro.resultado.insertId);
        try {
            const [resultado] = await conexao.execute(sql, array);

            return { sucesso: true, statusCod: 201, resultado };
        } catch (erro) {
            super.deletar(retornoCadastro.resultado.insertId)
            switch (true) {
                case erro.errno === 1062:
                    return { sucesso: false, statusCod: 409, campo: "cnpj", mensagem: "CNPJ já cadastrado para outro cliente" };
                case erro.errno === 1048:
                    return { sucesso: false, statusCod: 400, mensagem: "Preencha todos os campos obrigatorios" };
                default: console.error(erro)
            }
        }
    }
}

export default ClientePj;