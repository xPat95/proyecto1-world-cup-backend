require('dotenv/config');

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
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
