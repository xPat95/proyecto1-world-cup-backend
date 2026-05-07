const express = require('express');
const cors = require('cors');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const { testConnection } = require('./db/connection');
const stickersRoutes = require('./routes/stickers.routes');

const app = express();
const openApiDocument = YAML.load(path.join(__dirname, 'docs', 'openapi.yaml'));

app.use(cors());
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));

app.use('/stickers', stickersRoutes);

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
