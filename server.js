// Importa Express e o sqlite3
const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Cria instância do Express
const app = express();

// Porta do Servidor
const PORT = 3000;

// --- MIDDLEWARES ---
// Middleware para o Express entender JSON.
app.use(express.json());

// --- CONFIGURAÇÃO DO BANCO DE DADOS ---
// Conecta ao arquivo do banco de dados
const db = new sqlite3.Database('./database.db', (err) => {
    if(err) {
        console.error("Erro ao abrir o banco de dados", err.message);
    } else {
        console.log("Conectado ao banco de dados SQLite.");
        // Cria a tabela 'posts' se ela não existir
        db.run(`CREATE TABLE IF NOT EXISTS posts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT NOT NULL,
            categoria TEXT,
            foi_consumido BOOLEAN DEFAULT 0,
            data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP    
        )`);
    }
});



// --- ROTAS DA API ---

// Rota principal 
app.get('/', (req, res) => {
  res.send('<h1>A API do PostBox está funcionando!</h1>');
});

// Rota GET para buscar TODOS os posts
app.get('/posts', (req, res) => {
  const sql = "SELECT * FROM posts ORDER BY data_criacao DESC"; // Pega todos os posts, os mais novos primeiro

  db.all(sql, [], (err, rows) => {
    if (err) {
      // Se der erro no banco de dados, envia uma resposta de erro
      res.status(500).json({ "error": err.message });
      return;
    }
    // Se tudo der certo, envia os 'rows' (as linhas/posts) como resposta JSON
    res.json({
      "message": "success",
      "data": rows
    });
  });
});

// Rota para adicionar um novo post

app.post('/posts', (req, res) => {
    const { url, categoria } = req.body;

    if(!url) {
        return res.status(400).json({ "error": "O campo URL é obrigatório." });
    }

    const sql = `INSERT INTO posts (url, categoria) VALUES (?, ?)`;
    const params = [url, categoria];

    db.run (sql, params, function(err) {
        if(err) {
            res.status(500).json({ "error": err.message });
            return;
        }

        res.status(201).json({
            "message": "success",
            "data": {
                id: this.lastID,
                url: url,
                categoria: categoria
            }
        });
    });
});

// Rota para deletar posts
app.delete('/posts/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM posts WHERE id = ?';

    db.run(sql, id, function(err) {
        if(err) {
            res.status(500).json({ "error": res.message });
            return;
        }

        if(this.changes === 0) {
            res.status({ "error": "Post não encontrado." });
            return;
        }

        res.json({ "message": `Post ${id} foi deletado com sucesso.` })
    })
})

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. . Acesse em http://localhost:${PORT}`)
});