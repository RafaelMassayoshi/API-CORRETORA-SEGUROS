import conexao from "../conexao.js";

class ClientePf {

    constructor(id, dados) {
        this.setId(id);
        this.setNome(dados.nome);
        this.setNomeSocial(dados.nome_social);
        this.setDataNascimento(dados.data_nascimento);
        this.setEstadoCivil(dados.estado_civil);
        this.setSexo(dados.sexo);
        this.setCpf(dados.cpf);
        this.setRg(dados.rg);
        this.setProfissao(dados.profissao);
        this.setRendaBrutaMensal(dados.renda_bruta_mensal)
    }

    setId(valor) {
        this.id = valor;
    }

    setNome(valor) {
        this.nome = valor;
    }

    setNomeSocial(valor) {
        this.nomeSocial = valor;
    }

    setDataNascimento(valor) {
        this.dataNascimento = valor;
    }

    setEstadoCivil(valor) {
        this.estadoCivil = valor;
    }

    setSexo(valor) {
        this.sexo = valor;
    }

    setCpf(valor) {
        this.cpf = valor;
    }

    setRg(valor) {
        this.rg = valor;
    }

    setProfissao(valor) {
        this.profissao = valor;
    }

    setRendaBrutaMensal(valor) {
        this.rendaBrutaMensal = valor;
    }

    formarArray() {
        return [
            this.id,
            this.nome,
            this.nomeSocial,
            this.dataNascimento,
            this.estadoCivil,
            this.sexo,
            this.cpf,
            this.rg,
            this.profissao,
            this.rendaBrutaMensal
        ]
    }


    static async cadastrar(id, requisicao) {
        const dados = requisicao.body
        const sql = `INSERT INTO pessoas_fisicas (
        id,
        nome,
        nome_social,
        data_nascimento,
        estado_civil,
        sexo,
        cpf,
        rg,
        profissao,
        renda_bruta_mensal
        ) VALUES (
         ?,?,?,?,?,?,?,?,?,?)`;
        try {
            const clientePf = new ClientePf(id, dados);
            const array = clientePf.formarArray();
            const [resultado] = await conexao.execute(sql, array);

            return {statusCod:201, status: true, resultado};
        } catch (erro) {
            switch (true) {
                case erro.errno === 1062:
                    return {statusCod:409, campo: "cpf", mensagem: "Cpf já cadastrado para outro cliente" };
                case erro.errno === 1048:
                    return {statusCod:400, mensagem: "Preencha todos os campos obrigatorios" };
                default : console.error(erro)
            }
        }
    }
}

export default ClientePf;