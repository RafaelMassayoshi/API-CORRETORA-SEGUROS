import ClientePf from "../models/ClientePf.js";

class ClientePfService {

    static async cadastrar(dados) {
        const respostaValidacao = this.validar(dados)

        if(respostaValidacao.sucesso === true){
            return await ClientePf.cadastrar(dados);
        }
        return respostaValidacao;
    }
    static validar(corpo) {
        const erroscapturados = []
        const validacoes = [
            this.nome,
            this.dataNascimento,
            this.estadoCivil,
            this.sexo,
            this.cpf,
            this.rendaBrutaMensal
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

    static nome(corpo) {
        const nome = corpo.nome;
        if (!nome) {
            return { campo: "nome", mensagem: "O campo nome é obrigatorio" }
        } else if (nome.length < 3) {
            return { campo: "nome", mensagem: "O nome deve conter ao menos 3 letras" };
        }
    }

    static dataNascimento(corpo) {
        const data = corpo.data_nascimento
        const formato = /^\d{4}-\d{2}-\d{2}$/;
        if (!data) {
            return { campo: "data nascimento", mensagem: "Data de nascimento invalida" }
        } else if (!formato.test(data)) {
            return { campo: "data nascimento", mensagem: "Formato inválido" };
        }
    }

    static estadoCivil(corpo) {
        const estadoCivil = corpo.estado_civil;
        const opcoes = ['SOLTEIRO(A)', 'CASADO(A)', 'UNIAO-ESTAVEL', 'DIVORCIADO(A)', 'SEPARADO(A)', 'VIUVO(A)', null];
        if (!opcoes.includes(estadoCivil)) {
            return { campo: "estado civil", mensagem: "Opção invalida" };
        }
    }

    static sexo(corpo) {
        const sexo = corpo.sexo;
        const opcoes = ['MASCULINO', 'FEMININO'];
        if (!sexo) {
            return { campo: "sexo", mensagem: "Obrigatorio informar o sexo" }
        } else if (!opcoes.includes(sexo)) {
            return { campo: "sexo", mensagem: "Opção nvalida" };
        }
    }

    static cpf(corpo) {
        const cpf = corpo.cpf

        if (!cpf) {
            return { campo: "cpf", mensagem: "Obrigatorio informar este campo" }
        } else if (cpf.length != 11) {
            return { campo: "cpf", mensagem: "Formato inválido" }
        }

    }

    static rendaBrutaMensal(corpo) {
        const renda = corpo.renda_bruta_mensal;
        if (typeof renda != "number" && renda != null) {
            return { campo: "renda bruta mensal", mensagem: "Formato invalido" }
        }
    }
}
export default ClientePfService;