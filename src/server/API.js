const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importe o pacote cors
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
const { NEWDATE } = require('mysql/lib/protocol/constants/types');

const app = express();

app.use(cors()); // Adicione o middleware cors

app.use(bodyParser.json());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'thepixelbank',
  });

  db.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      throw err;
    }
    console.log('Conexão com o banco de dados MySQL estabelecida.');
  });
  
  // Configurar a sessão
  app.use(
    session({
      secret: 'l8408230482309820482309483048',
      resave: true,
      saveUninitialized: true,
    })
  );

  app.post('/Cadastro', (req, res) => {
    const { nome, cpf, email, senha, } = req.body
    console.log(`${JSON.stringify(body)}`);

    console.log(`${nome} ${cpf} ${email} ${senha}`);

    const verification = 'SELECT * FROM users WHERE username = ? OR cpf = ? OR numConta = ?';
    console.log(`${verification}`);
    
    db.query(verification, [nome, cpf, numConta], (verifErr, results) => {
      if (verifErr) {
        console.error('Erro no inserimento dos dados', checkErr);
      }
      if (results.length <= 0) {
        console.log(`Inserindo novo usuário no sistema com estes dados: ${username} - ${cpf}`);
        const query = 'INSERT INTO users (nome, cpf, email, senha, numConta, Saldo, tipo) VALUES (?, ?, ?, SHA1(?), ?, "123456789", "1000", "user")';
        db.query(query, [nome, cpf, email, senha, Saldo], (err, results) => {
          if (err) {
            console.error('Erro ao inserir usuário:', err);
            res.send('erro');
          } else {
            res.send('sucess');
          }
        });
      } else {
        console.log(`O cadastro com estás informações já constam no sistema: ${nome} - ${cpf} - ${numConta}`)
        res.send(`O cadastro com estás informações já constam no sistema: ${nome} - ${cpf} - ${numConta}`);
      }
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
