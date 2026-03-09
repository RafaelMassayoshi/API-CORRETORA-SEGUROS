import conexao from "../conexao.js"
class ClientePj{

    constructor(id, dados) {
        //super(dados)
        this.id = id
        this.razaoSocial = dados.razao_social
        this.nomeFantasia = dados.nome_fantasia
        this.cnpj = dados.cnpj
        this.codigoAtividadeEconomica = dados.codigo_atividade_economica
        this.ramoAtividade = dados.ramo_atividade
        this.dataAbertura = dados.data_abertura
        this.codigoNaturezaJuridica = dados.codigo_natureza_juridica
        this.descricaoNaturezaJuridica = dados.descricao_natureza_juridica

    }

    formarArray() {
        return [
            this.id,
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

    static async cadastrar(id, requisicao) {
        const dados = requisicao.body
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
        try {
            const cliente = new ClientePj(id, dados);
            const array = cliente.formarArray(cliente);
            console.log(cliente, array)
            const [resultado] = await conexao.execute(sql, array);

            return { sucesso: true, statusCod: 201, resultado };
        } catch (erro) {
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