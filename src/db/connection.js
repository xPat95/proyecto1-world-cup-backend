require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'world_cup_stickers',
  user: process.env.DB_USER || 'postgres',
  password: String(process.env.DB_PASSWORD || 'postgres'),
});

async function testConnection() {
  try {
    const result = await pool.query('SELECT NOW();');

    return result.rows[0].now;
  } catch (error) {
    console.error('Database connection test failed:', error.message);
    throw new Error('Database connection failed');
  }
}

module.exports = {
  pool,
  testConnection,
};
