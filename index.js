const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = '80b2bf0b90864d449a2ddf35c59462bb';

app.get('/matches', async (req, res) => {
  const { dateFrom, dateTo, competition } = req.query;

  try {
    const url = `https://api.football-data.org/v4/competitions/${competition}/matches?dateFrom=${dateFrom}&dateTo=${dateTo}`;
    
    const response = await fetch(url, {
      headers: {
        'X-Auth-Token': API_KEY
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar dados da API', detail: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy rodando na porta ${PORT}`);
});
