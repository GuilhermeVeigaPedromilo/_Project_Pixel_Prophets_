const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors"); // Importe o pacote cors
const mysql = require('mysql');
const session = require('express-session');
const path = require('path');
const { stringify } = require("querystring");

const app = express();

app.use(cors()); // Adicione o middleware cors

app.use(bodyParser.json());

// Configurar a conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    senha: '',
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

  app.get("/dados", (req, res) => {
  db.query((err, data) => {
    if (err) {
      console.error("Erro ao ler o arquivo JSON:", err);
      res.status(500).send("Erro ao ler o arquivo JSON");
      return;
    }
    const jsonData = JSON.parse(data);
    res.json(jsonData);
    console.log(jsonData);
  });
});

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

  app.post('/Login', (req, res) => {
    const { nome, senha, cpf } = req.body;
    console.log(`${JSON.stringify(req.body)}`);
  
    const query = 'SELECT * FROM users WHERE cpf = ? AND senha = SHA1(?)';
    console.log(`${query}`);
  
    // db.query(query, [ nome, senha, cpf ], (err, results) => {
    db.query(query, [ senha, cpf ], (err, results) => {
      console.log(`RESULTS: ${JSON.stringify(results)}`)
      console.log(`SESSION: ${JSON.stringify(req.session)}`)
      if (err) throw err;
  
      if (results.length > 0) {
        
        // Autenticação bem-sucedida
        req.session.loggedin = true;
        req.session.name = nome;
  
        // Verifique o tipo de usuário
        const tipoUsuario = results[0].tipo;
  
        req.session.tipoUsuario = tipoUsuario
  
        if (tipoUsuario === 'user') {
          console.log("Usuario Logado");
          req.session.loggedin = true;
          req.session.name = nome;
        } else if (tipoUsuario === 'Admin') {
          console.log("Usuario Logado");
          req.session.loggedin = true;
          req.session.name = nome;
        } else {
          // Tratamento para outros tipos de usuário ou tipo desconhecido
          res.send('Tipo de usuário desconhecido. <a href="/">Tente novamente</a>');
        }
      } else {
        // Credenciais incorretas
        console.log(`${JSON.stringify(req)}`);

        res.send('Credenciais Incorretas');
      }
    });
  });
  
  
  // Rota para fazer logout
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/');
      console.log('Desconectado')
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
