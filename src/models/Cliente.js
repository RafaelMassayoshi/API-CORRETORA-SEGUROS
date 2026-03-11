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

    static async cadastrar(dados) {

        const sql = `INSERT INTO clientes (
           tipo_cliente,
           observacoes
           ) VALUES (
            ?,?)`;
        try {
            const cliente = new Cliente(dados);
            const array = cliente.formarArray();
            const [resultado] = await conexao.execute(sql, array)

            return resultado.insertId;
        } catch (erro) {
            console.error(erro)
        }

    }

    static async deletar(id) {
        const sql = "DELETE FROM clientes WHERE id = ?"

        const [resultado] = await conexao.execute(sql, [id]);
        return resultado;
    }

    static async listar() {
        const sqlPf = `SELECT * FROM clientes INNER JOIN pessoas_fisicas ON clientes.id = pessoas_fisicas.id;`;
        const sqlPj = `SELECT * FROM clientes INNER JOIN pessoas_juridicas WHERE clientes.id = pessoas_juridicas.id;`;


        const [resultadoPf] = await conexao.execute(sqlPf)
        const [resultadoPj] = await conexao.execute(sqlPj)

        const clientes = []

        resultadoPf.forEach(clientePf => {
            clientes.push(clientePf)
        })
        resultadoPj.forEach(clientePJ => {
            clientes.push(clientePJ)
        })


        console.log(clientes)
        return { sucesso: true, statusCod: 200, clientes }

    }
}

export default Cliente;