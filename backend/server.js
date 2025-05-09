const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

// Allow frontend to communicate with backend
const corsOptions = {
  origin: ['http://localhost:5000', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST'],
};

app.use(cors(corsOptions));
app.use(express.json());

// Serve static files 
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// contact route
app.post('/contact', async (req, res) => {
  console.log('Received POST /contact');
  console.log('Request body:', req.body);

  const { Name, Email, Message } = req.body;

  try {
    const response = await axios.post(process.env.GOOGLE_SCRIPT_URL, null, {
      params: {
        Name,
        Email,
        Message,
        token: process.env.SECRET_TOKEN,
      }
    });

    console.log('Google Sheet response:', response.data);
    res.status(200).json(response.data);
  } catch (err) {
    console.error(' Error sending to Google Apps Script:', err.response?.data || err.message);
    res.status(500).json({ error: 'Failed to send data' });
  }
});

// Optional: fallback route for SPA frontend
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(` Test server running on http://localhost:${PORT}`);
});
