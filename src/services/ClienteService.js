import ClientePfService from "./ClientePfService.js";

class ClienteService {

    //validar os dados enviados pelo corpo da requisicao
    static validarCorpoReq(requisicao, resposta) {
        const corpoReqFormatado = ClienteService.corpo(requisicao);
        const erros = ClienteService.tipoCliente(corpoReqFormatado);
        
        if (erros.length === 0) {
            return corpoReqFormatado;
        } else {
            return { sucesso: false, statusCod: 400, erros };
        }
    }
    //Formata todos os dados enviados e se não for passado define como nullo;
    static corpo(requisicao) {
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

    //verificar se o tipo de cliente informado é valido
    static tipoCliente(corpo) {

        switch (true) {
            case corpo.tipo_cliente === "PF":
                return ClientePfService.validar(corpo);

            case corpo.tipo_cliente === "PJ":
                return [];

            default:
                console.log("Informe um tipo valido")
                return { campo: "tipo cliente", mensagem: "Informe um tipo valido de cliente" };
        }
    }


}

export default ClienteService;