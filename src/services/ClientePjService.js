import ClientePj from "../models/ClientePj.js";
class ClientePjService {

    static async cadastrar(dados) {
        const erros = this.validar(dados)

        if(erros.sucesso === true){
            return await ClientePj.cadastrar(dados);
        } else {
            return erros;
        }
    }
    static validar(corpo) {
        const erroscapturados = []
        const validacoes = [
            this.razaoSocial,
            this.cnpj,
            this.codigoAtividadeEconomica,
            this.dataAbertura,
            this.codigoNaturezaJuridica,
        ]

        validacoes.forEach(validacao => {
            const erro = validacao(corpo);
            if (erro) {
                erroscapturados.push(erro)
            }
        })
    
        if (erroscapturados.length !== 0) {
            return { sucesso: false, statusCod: 400, erroscapturados }
        } else {
            return { sucesso: true }
        }
    }

    static razaoSocial(corpo) { 
        const razaoSocial = corpo.razao_social;
        if (!razaoSocial) {
            return { campo: "razao social", mensagem: "O campo razao social é obrigatorio" }
        } else if (razaoSocial.length < 3) {
            return { campo: "razao social", mensagem: "A razao social deve conter ao menos 3 letras" };
        }
    }

    static dataAbertura(corpo) {
        const data = corpo.data_abertura
        const formato = /^\d{4}-\d{2}-\d{2}$/;
        if (!data) {
            return { campo: "data abertura", mensagem: "Data de abertura invalida" }
        } else if (!formato.test(data)) {
            return { campo: "data abertura", mensagem: "Formato inválido" };
        }
    }

    static cnpj(corpo) {
        const cnpj = corpo.cnpj

        if (!cnpj) {
            return { campo: "cnpj", mensagem: "Obrigatorio informar este campo" }
        } else if (cnpj.length != 14) {
            return { campo: "cnpj", mensagem: "Formato inválido" }
        }

    }

    static codigoAtividadeEconomica(corpo){
        const codigo = corpo.codigo_atividade_economica;
        if(codigo.length > 20){
            return {campo: "codigo atividade economica", mensagem: "Formato invalido"}
        }
    }
    static codigoNaturezaJuridica(corpo){
        const codigo = corpo.codigo_natureza_juridica;
        if(codigo.length > 20){
            return {campo: "codigo natureza juridica", mensagem: "Formato invalido"}
        }
    }


}
export default ClientePjService;