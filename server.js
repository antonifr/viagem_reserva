const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

if (!AMADEUS_API_KEY || !AMADEUS_API_SECRET) {
  console.error('Erro: As variáveis AMADEUS_API_KEY e AMADEUS_API_SECRET não estão definidas.');
  process.exit(1);
}

let accessToken = null;

async function authenticateAmadeus() {
  try {
    const res = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
        client_id: AMADEUS_API_KEY,
        client_secret: AMADEUS_API_SECRET,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error('Falha ao autenticar na Amadeus:', text);
      return;
    }

    const data = JSON.parse(text);
    accessToken = data.access_token;
    console.log('Token Amadeus obtido com sucesso.');
  } catch (error) {
    console.error('Erro na autenticação Amadeus:', error);
  }
}

app.use(async (req, res, next) => {
  if (!accessToken) {
    await authenticateAmadeus();
  }
  next();
});

app.get('/api/flights', async (req, res) => {
  try {
    const { origin, destination, departureDate } = req.query;
    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${origin}&destinationLocationCode=${destination}&departureDate=${departureDate}&adults=1`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const text = await response.text();
    if (!response.ok) {
      console.error('Erro na resposta da API de voos:', text);
      return res.status(500).json({ error: 'Erro ao buscar voos' });
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error('Erro no backend (voos):', err);
    res.status(500).json({ error: 'Erro interno no servidor (voos)' });
  }
});

app.get('/api/hotels', async (req, res) => {
  try {
    const { cityCode, checkInDate, checkOutDate } = req.query;

    const response = await fetch(`https://test.api.amadeus.com/v2/shopping/hotel-offers?cityCode=${cityCode}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&adults=1&roomQuantity=1&paymentPolicy=NONE&bestRateOnly=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    const text = await response.text();
    if (!response.ok) {
      console.error('Erro na resposta da API de hotéis:', text);
      return res.status(500).json({ error: 'Erro ao buscar hotéis' });
    }

    const data = JSON.parse(text);
    res.json(data);
  } catch (err) {
    console.error('Erro no backen
