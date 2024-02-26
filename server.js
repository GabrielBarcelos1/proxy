const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
require('dotenv').config();

app.use(cors());

// Rota para encaminhar todas as solicitações GET
app.get('/api/*', async (req, res) => {
const path = req.params[0]
const queryString = req.url.split('?')[1] || ''; // Captura a string de consulta, se houver
console.log(`console.log https://prologapp.com/prolog/api/v3/${path}`)
  try {
    const { data } = await axios.get(`https://prologapp.com/prolog/api/v3/${path}?${queryString}`, {
      headers: {
        'x-prolog-api-token': process.env.API_TOKEN
      }
    });
    res.send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao acessar a API');
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));