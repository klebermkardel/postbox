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


// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. . Acesse em http://localhost:${PORT}`)
});