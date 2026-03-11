import ClientePfService from "./ClientePfService.js";
import Cliente from "../models/Cliente.js";
import ClientePf from "../models/ClientePf.js";

class ClienteService {

    //validar os dados enviados pelo corpo da requisicao
    static async validarCorpoReq(requisicao) {
        const corpoRequisicaoFormatado = this.toUpperAndTrim(requisicao);
        return await this.validarPorTipoCliente(corpoRequisicaoFormatado);
    }
    //Formata todos os dados enviados e se não for passado define como nullo;
    static toUpperAndTrim(requisicao) {
        const corpo = requisicao.body;
        Object.entries(corpo).forEach(([atributo, valor]) => {

            if (typeof valor === "string") {
                corpo[atributo] = valor.trim().toUpperCase();

                if (!corpo[atributo] || corpo[atributo] === null || corpo[atributo] === "") {
                    corpo[atributo] = null;
                }
            } else {
                corpo[atributo] = valor;
            }
        });
        return corpo;
    }

    //verificar se o tipo de cliente informado é valido e insere no banco ou retorna os campos de erros
    static async validarPorTipoCliente(corpoRequisicaoFormatado) {

        switch (true) {
            case corpoRequisicaoFormatado.tipo_cliente === "PF":

                const erros = ClientePfService.validar(corpoRequisicaoFormatado);
                const errosCapturados = this.verificarErros(erros);

                if (errosCapturados.sucesso === true) {
                    const id = await Cliente.cadastrar(corpoRequisicaoFormatado);
                    const retornoPf = await ClientePf.cadastrar(id, corpoRequisicaoFormatado);

                    if (!retornoPf || retornoPf.sucesso === false) {
                        await Cliente.deletar(id);
                    }
                    return retornoPf

                } else {
                    return errosCapturados;
                }

            case corpoRequisicaoFormatado.tipo_cliente === "PJ":
                return [];

            default:
                console.log("Informe um tipo valido")
                return { sucesso: false, statusCod: 400, campo: "tipo cliente", mensagem: "Informe um tipo valido de cliente" };
        }
    }

    static verificarErros(erros) {
        if (erros.length !== 0) {
            return { sucesso: false, statusCod: 400, erros };
        } else {
            return { sucesso: true }
        }

    }
}

export default ClienteService;