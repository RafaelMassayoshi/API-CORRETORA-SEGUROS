import 'dotenv/config'
import express, { json } from "express";
import ClientesController from "./src/controllers/ClientesController.js"
import Validar from './src/midlewares/midlewareClientes.js';

const port = process.env.PORT

const app = express();
app.use(json());

app.post('/clientes', Validar.dados, ClientesController.cadastrar);
app.get('/clientes', ClientesController.listar);

app.listen(port, () => {
  console.log(`Servidor rodando em localhost:${port}`)
})
