import ClientePfService from "./ClientePfService.js";
import ClientePjService from "./ClientePjService.js";

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
                return await ClientePfService.cadastrar(corpoRequisicaoFormatado);

            case corpoRequisicaoFormatado.tipo_cliente === "PJ":
                return await ClientePjService.cadastrar(corpoRequisicaoFormatado);

            default:
                console.log("Informe um tipo valido")
                return { sucesso: false, statusCod: 400, campo: "tipo cliente", mensagem: "Informe um tipo valido de cliente" };
        }
    }

}

export default ClienteService;