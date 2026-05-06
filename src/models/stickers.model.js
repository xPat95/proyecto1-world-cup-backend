const { pool } = require('../db/connection');

async function getAllStickers() {
  const result = await pool.query('SELECT * FROM stickers ORDER BY id ASC;');

  return result.rows;
}

async function getStickerById(id) {
  const result = await pool.query('SELECT * FROM stickers WHERE id = $1;', [id]);

  return result.rows[0];
}

async function createSticker(stickerData) {
  const {
    sticker_number,
    player_name,
    country,
    position,
    quantity,
    notes,
  } = stickerData;

  const result = await pool.query(
    `INSERT INTO stickers (
      sticker_number,
      player_name,
      country,
      position,
      quantity,
      notes
    )
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *;`,
    [sticker_number, player_name, country, position, quantity, notes],
  );

  return result.rows[0];
}

async function updateSticker(id, stickerData) {
  const {
    sticker_number,
    player_name,
    country,
    position,
    quantity,
    notes,
  } = stickerData;

  const result = await pool.query(
    `UPDATE stickers
    SET
      sticker_number = $1,
      player_name = $2,
      country = $3,
      position = $4,
      quantity = $5,
      notes = $6,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $7
    RETURNING *;`,
    [sticker_number, player_name, country, position, quantity, notes, id],
  );

  return result.rows[0];
}

async function deleteSticker(id) {
  const result = await pool.query(
    'DELETE FROM stickers WHERE id = $1 RETURNING *;',
    [id],
  );

  return result.rows[0];
}

module.exports = {
  getAllStickers,
  getStickerById,
  createSticker,
  updateSticker,
  deleteSticker,
};
