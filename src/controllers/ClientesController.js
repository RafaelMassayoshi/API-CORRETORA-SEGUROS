import ClienteService from "../services/ClienteService.js";
import Cliente from "../models/Cliente.js";
class ClientesController {
    
    static async cadastrar(requisicao, resposta) {
        const retorno = await ClienteService.validarCorpoReq(requisicao);
        resposta.status(retorno.statusCod).json(retorno);
    
    }

    static async listar(requisicao, resposta) {
        const retorno = await Cliente.listar(requisicao, resposta);
        resposta.status(retorno.statusCod).json(retorno)
    }
}

export default ClientesController;