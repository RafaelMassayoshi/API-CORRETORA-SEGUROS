class ValidarRequisicao {

    static async validarCorpoReq(requisicao, resposta, next) {
        !requisicao.body ?
            resposta.status(400).json("Nenhum campo preenchido...")
            : next()
    }
}
export default ValidarRequisicao;