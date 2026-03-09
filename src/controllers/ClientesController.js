import ClienteService from "../services/ClienteService.js";
import Cliente from "../models/Cliente.js";
import ClientePf from "../models/ClientePf.js";
import ClientePj from "../models/ClientePj.js";

class ClientesController {

    static async cadastrar(requisicao, resposta) {
        const retornoValidacao = ClienteService.validarCorpoReq(requisicao, resposta);

        if (retornoValidacao.sucesso === false) {
            resposta.status(retornoValidacao.statusCod).json({ Erro: retornoValidacao })
            return;
        }
        
        requisicao.body = retornoValidacao;
        const { id, tipoCliente } = await Cliente.cadastrar(requisicao);
        
        console.log(id)
        switch (true) {
            case tipoCliente === "PF":
                const clientePf = await ClientePf.cadastrar(id, requisicao);
                if (!clientePf.sucesso === true) {
                    Cliente.deletar(id)
                }
                resposta.status(clientePf.statusCod).json(clientePf)
                break;
            case tipoCliente === "PJ":
                const clientePj = await ClientePj.cadastrar(id, requisicao);
                if (!clientePj.sucesso === true) {
                    Cliente.deletar(id)
                }
                resposta.status(clientePj.statusCod).json(clientePj)  
            break;
        }




    }

    static async listar(requisicao, resposta) {
        Cliente.listar(requisicao, resposta);
    }
}

export default ClientesController;