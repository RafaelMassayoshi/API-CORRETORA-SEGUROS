import conexao from "../conexao.js";
class Cliente {


    constructor(dados) {
        this.setTipoCliente(dados.tipo_cliente)
        this.setObservacoes(dados.observacoes);
    }


    setTipoCliente(valor) {
        this.tipoCliente = valor;
    }

    setObservacoes(valor) {
        this.observacoes = valor;
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
        return resultado;
    }
    static async listar(requisicao, resposta) {
        const sql = `
        SELECT * FROM clientes INNER JOIN pessoas_fisicas WHERE clientes.id = pessoas_fisicas.id;
        `;

        const [resultados] = await conexao.query(sql)
        resultados.forEach(cliente => {

        })
        resposta.status(200).json(resultados)
    }
}

export default Cliente;