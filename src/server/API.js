const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const session = require('express-session');

const app = express();

app.use(cors({
    origin: 'http://localhost:8081', // substitua com a URL do seu frontend
    credentials: true // para permitir envio de cookies do frontend
}));

app.use(bodyParser.json());
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set secure: true if using https
}));

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

  app.post('/Cadastro', (req, res) => {
    const { nome, cpf, email, senha, Saldo, numConta} = req.body

    console.log(`${JSON.stringify(req.body)}`);

    const verification = 'SELECT * FROM users WHERE nome = ? OR cpf = ?';
    console.log(`${verification}`);
    
    db.query(verification, [nome, cpf ], (verifErr, results) => {
      if (verifErr) {
        console.error('Erro no inserimento dos dados', verifErr);
      }
      console.log(`${results}`);
      if (results.length <= 0) {
        console.log(`Inserindo novo usuário no sistema com estes dados: ${nome} - ${cpf} - ${numConta}`);
        const query = `INSERT INTO users (nome, cpf, email, senha, numConta, Saldo, tipo) VALUES (?, ?, ?, SHA1(?), '${cpf}', "1000.00", "user")`;
        db.query(query, [nome, cpf, email, senha, Saldo], (err, results) => {
          if (err) {
            console.error('Erro ao inserir usuário:', err);
          } else {
            console.error('Sucesso');
          }
        });
      } else {
        console.log(`O cadastro com estás informações já constam no sistema: ${nome} - ${cpf} `)
        res.send(`O cadastro com estás informações já constam no sistema: ${nome} - ${cpf} `);
      }
    });
  });

  app.post("/Login", (req, res) => {
    const { cpf, senha } = req.body;
    const query = "SELECT * FROM users WHERE cpf = ? AND senha = SHA1(?)";
    db.query(query, [cpf, senha], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
          req.session.user = results[0];
          res.status(200).send(results[0]);
          //res.status(200).send("Login bem-sucedido");
          console.log(`Login realizado pelo ${JSON.stringify(req.session.user)}: ${cpf} - ${senha}`)
      } else {
          res.status(401).send("Credenciais incorretas");
          console.log('401')
      }
    });
  });

  app.post('/SelectConta', (req, res) => {
    const {numConta} = req.body;
    const query = "SELECT * FROM users WHERE numConta = ?";
    console.log(`ENDPOINT /SelectConta: ${JSON.stringify(req.body)}`);
    db.query(query, [numConta], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        console.log(`Conta destino: ${JSON.stringify(results)}: ${numConta}`)
        res.send(results);
      } else {
        res.status(401).send("Conta inexistente");
        console.log('401')
      }
    })
  })

// Rota para obter dados do usuário logado
app.get('/user', (req, res) => {
    if (JSON.stringify(req.session.user)) {
        res.status(200).send(JSON.stringify(req.session.user));
    } else {
        res.status(401).send('Not authenticated');
    }
}); 
  
  // Rota para fazer logout
  app.get('/logout', (req, res) => {
    req.session.destroy(() => {
      console.log('Desconectado')
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
