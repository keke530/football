require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

app.use(cors());

const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = process.env.PORT || 3000;

// Rota para a raiz "/"
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor de futebol!');
});

// Definindo o endpoint /competitions
app.get('/competitions', async (req, res) => {
  try {
    const response = await fetch('https://api.football-data.org/v4/competitions/', {
      headers: { 'X-Auth-Token': process.env.API_KEY }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar dados da API' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


// Endpoint para listar competições
app.get('/competitions', async (req, res) => {
  try {
    const response = await fetch(`${BASE_URL}/competitions`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar competições' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
});

// Endpoint para listar partidas por data e competição
app.get('/matches', async (req, res) => {
  const { competition = 'PL', dateFrom, dateTo } = req.query;

  if (!dateFrom || !dateTo) {
    return res.status(400).json({ error: 'Parâmetros dateFrom e dateTo são obrigatórios' });
  }

  try {
    const response = await fetch(`${BASE_URL}/competitions/${competition}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`, {
      headers: { 'X-Auth-Token': API_KEY }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Erro ao buscar partidas' });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro interno do servidor', detalhes: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
