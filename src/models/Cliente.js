import conexao from "../conexao.js";
class Cliente {


    constructor(dados) {
        this.tipoCliente = dados.tipo_cliente;
        this.observacoes = dados.observacoes;
    }

    formarArray() {
        return [
            this.tipoCliente,
            this.observacoes
        ]
    }

    static async cadastrar(requisicao) {
        const dados = requisicao.body;
        const sql = `INSERT INTO clientes (
           tipo_cliente,
           observacoes
           ) VALUES (
            ?,?)`;

        try {
            const cliente = new Cliente(dados);
            const array = cliente.formarArray();
            console.log(dados)
            const [resultado] = await conexao.execute(sql, array)

            const id = resultado.insertId;
            const tipoCliente = cliente.tipoCliente;


            return { id, tipoCliente }
        } catch (erro) {
            console.error(erro)
        }

    }

    static async deletar(id) {
        const sql = "DELETE FROM clientes WHERE id = ?"

        const [resultado] = await conexao.execute(sql, [id]);
        return {sucesso: false, codStatus:400, menssagem: "Falaha ao cadastrar cliente, verifique os campos informados e tente novamente", resultado}
    }

    static async listar(requisicao, resposta) {
        const sqlPf = `
        SELECT * FROM clientes INNER JOIN pessoas_fisicas WHERE clientes.id = pessoas_fisicas.id;
        `;
        const sqlPj = `
        SELECT * FROM clientes INNER JOIN pessoas_juridicas WHERE clientes.id = pessoas_juridicas.id;
        `;

        
        const [resultadoPf] = await conexao.query(sqlPf)
        const [resultadoPj] = await conexao.query(sqlPj)

        const resultados = [resultadoPf, resultadoPj]

        resposta.status(200).json({resultados})
    }
}

export default Cliente;