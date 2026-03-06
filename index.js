import 'dotenv/config'
import express, { json } from "express";
import ClientesController from "./src/controllers/ClientesController.js"
import ValidarRequisicao from './src/midlewares/midlewareRequisicao.js';

const port = process.env.PORT

const app = express();
app.use(json());

app.post('/clientes',ValidarRequisicao.validarCorpoReq, ClientesController.cadastrar);
app.get('/clientes', ClientesController.listar);

app.listen(port, () => {
  console.log(`Servidor rodando em localhost:${port}`)
})
