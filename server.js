// Importa Express
const express = require('express');

// Cria instância do Express
const app = express();

// Porta do Servidor
const PORT = 3000;

// ROTA PRINCIPAL

app.get('/', (req, res) => {
  res.send('<h1>API no ar!</h1>')  
})

// Inicia o servidor e o faz escutar na porta definida
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}. . Acesse em http://localhost:${PORT}`)
});