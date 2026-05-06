const express = require('express');
const cors = require('cors');
const { testConnection } = require('./db/connection');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
  });
});

app.get('/ping/db', async (req, res) => {
  try {
    const databaseTime = await testConnection();

    res.json({
      status: 'ok',
      message: 'Database connection is working',
      databaseTime,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Database connection failed',
    });
  }
});

module.exports = app;
