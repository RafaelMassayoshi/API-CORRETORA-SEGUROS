
import mysql from 'mysql2/promise';


const conexao = await mysql.createConnection({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    //multipleStatements: true
});

try {
    conexao
    console.log("_-_-_-_-_-_- CONEXÃO BEM SUCEDIDA -_-_-_-_-_-_")
} catch (erro) {
    console.error("_-_-_-_-_-_- FALHA NA CONEXÃO -_-_-_-_-_-_\n")
    
}


export default conexao;
