const { pool } = require('../db/connection');

async function getAllStickers() {
  const result = await pool.query('SELECT * FROM stickers ORDER BY id ASC;');

  return result.rows;
}

async function getStickerById(id) {
  const result = await pool.query('SELECT * FROM stickers WHERE id = $1;', [id]);

  return result.rows[0];
}

module.exports = {
  getAllStickers,
  getStickerById,
};
