import ClienteService from "../services/ClienteService.js";
import Cliente from "../models/Cliente.js";
import ClientePf from "../models/ClientePf.js";

class ClientesController {

    static async cadastrar(requisicao, resposta) {
        const retorno = ClienteService.validarCorpoReq(requisicao, resposta);
        console.log(retorno)

        if (retorno.status === false) {
            console.log("Houve erros", retorno)
            resposta.status(retorno.statusCod).json({retorno})
            return;
        }

        requisicao.body = retorno;
        const { id, tipoCliente } = await Cliente.cadastrar(requisicao);

        switch (true) {
            case tipoCliente === "PF":
                const resultado = await ClientePf.cadastrar(id, requisicao);
                if (!resultado.status === true) {
                    Cliente.deletar(id)
                }
                resposta.status(resultado.statusCod).json(resultado)
                break;
        }




    }

    static async listar(requisicao, resposta) {
        Cliente.listar(requisicao, resposta);
    }
}

export default ClientesController;