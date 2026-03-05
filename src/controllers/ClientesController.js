import Cliente from "../models/Cliente.js";
import ClientePf from "../models/ClientePf.js";

class ClientesController {

    static async cadastrar(requisicao, resposta) {
        const { id, tipoCliente } = await Cliente.cadastrar(requisicao);


        switch (true) {
            case tipoCliente === "PF":
                const resultado = await ClientePf.cadastrar(id, requisicao);
                console.log(resultado)
                resposta.status(resultado.codStatus).json(resultado)
                break;
        }

    }

    static async listar(requisicao, resposta) {
        Cliente.listar(requisicao, resposta);
    }
}

export default ClientesController;