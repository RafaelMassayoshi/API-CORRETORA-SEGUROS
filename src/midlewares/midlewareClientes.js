class Validar {

    //validar os dados enviados pelo corpo da requisicao
    static dados(requisicao, resposta, next) {
        const corpo = Validar.corpo(requisicao);
        // console.log(corpo);

        const erros = Validar.tipoCliente(corpo);

        if (erros.length != 0) {
            resposta.status(400).json(erros)
        } else {

            next();
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
        const errosCapturados = [];

        switch (true) {
            case corpo.tipo_cliente === "PF":
                //console.log("tipo cliente valido");
                const validacoes = [
                    Validar.nome,
                    Validar.dataNascimento,
                    Validar.estadoCivil,
                    Validar.sexo,
                    Validar.cpf,
                    Validar.rendaBrutaMensal
                ];

                validacoes.forEach(validacao => {
                    const erro = validacao(corpo);
                    if (erro) {
                        errosCapturados.push(erro)
                    }
                })

                break;

            case corpo.tipo_cliente === "PJ":
                console.log("Ainda sem função");
                break

            default:
                console.log("Informe um tipo valido")
                return { campo: "tipo cliente", mensagem: "Informe um tipo valido de cliente" };
        }
        return errosCapturados;
    }

    static nome(corpo) {
        const nome = corpo.nome;
        if (!nome) {
            console.log("obrigatorio informar o nome")
            return { campo: "nome", mensagem: "O campo nome é obrigatorio" }
        } else if (nome.length < 3) {
            console.log("nome muito curto")
            return { campo: "nome", mensagem: "Nome muito curto" };
        }
    }

    static dataNascimento(corpo) {
        const data = corpo.data_nascimento
        const formato = /^\d{4}-\d{2}-\d{2}$/;

        if (!data) {
            return { campo: "data nascimento", mensagem: "Data de nascimento invalida" }
        }
        else if (!formato.test(data)) {
            return { campo: "data nascimento", mensagem: "Formato inválido" };
        }
    }

    static estadoCivil(corpo) {
        const estadoCivil = corpo.estado_civil;
        const opcoes = ['SOLTEIRO(A)', 'CASADO(A)', 'UNIAO-ESTAVEL', 'DIVORCIADO(A)', 'SEPARADO(A)', 'VIUVO(A)', null];
        if (!opcoes.includes(estadoCivil)) {
            console.log("estado civil invalido")
            return { campo: "estado civil", mensagem: "Estado civil invalido" };
        }
    }

    static sexo(corpo) {
        const sexo = corpo.sexo;
        const opcoes = ['MASCULINO', 'FEMININO'];
        if (!sexo) {
            console.log("Obrigatorio informar o sexo")
            return { campo: "sexo", mensagem: "Obrigatorio informar o sexo" }
        } else if (!opcoes.includes(sexo)) {
            console.log("Sexo informado é invalido")
            return { campo: "estado civil", mensagem: "Estado civil invalido" };
        }
    }

    //Verificar se o CPF informado é valido
    static cpf(corpo) {
        const cpf = corpo.cpf

        if (!cpf) {
            return { campo: "cpf", mensagem: "Obrigatorio informar este campo" }
        } else if (cpf.length != 11) {
            console.log("CPF INVALIDO")
            return { campo: "cpf", mensagem: "Informe um CPF válido" }
        }

    }

    static rendaBrutaMensal(corpo) {
        const renda = corpo.renda_bruta_mensal;
        if (typeof renda != "number" && renda != null) {
            console.log("valor informado é invalido")
            return { campo: "renda bruta mensal", mensagem: "Valor informado é invalido" }
        }
    }
}

export default Validar;