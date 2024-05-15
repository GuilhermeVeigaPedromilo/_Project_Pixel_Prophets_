const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importe o pacote cors
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');

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
    const { nome, cpf, email, senha, Saldo, numConta} = req.body
    
    console.log(`${JSON.stringify(req.body)}`);

    // console.log(`Nome:${nome}, CPF:${cpf}, E-mail:${email}, Senha:${senha}`);

    const verification = 'SELECT * FROM users WHERE nome = ? OR cpf = ?';
    console.log(`${verification}`);
    
    db.query(verification, [nome, cpf ], (verifErr, results) => {
      if (verifErr) {
        console.error('Erro no inserimento dos dados', verifErr);
      }
      console.log(`${results}`);
      if (results.length <= 0) {
        console.log(`Inserindo novo usuário no sistema com estes dados: ${nome} - ${cpf} - ${numConta}`);
        const query = `INSERT INTO users (nome, cpf, email, senha, numConta, Saldo, tipo) VALUES (?, ?, ?, SHA1(?), '?', "1000", "user")`;
        db.query(query, [nome, cpf, email, senha, Saldo], (err, results) => {
          if (err) {
            console.error('Erro ao inserir usuário:', err);
          } else {
            console.error('Sucesso');
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
