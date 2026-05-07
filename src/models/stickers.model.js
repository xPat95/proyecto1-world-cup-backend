const { pool } = require('../db/connection');

const ALLOWED_SORT_COLUMNS = {
  id: 'id',
  sticker_number: 'sticker_number',
  player_name: 'player_name',
  country: 'country',
  position: 'position',
  quantity: 'quantity',
  created_at: 'created_at',
  updated_at: 'updated_at',
};

async function getAllStickers(options = {}) {
  const {
    q,
    country,
    status,
    sort = 'id',
    order = 'asc',
    page = 1,
    limit = 10,
  } = options;

  const whereConditions = [];
  const values = [];

  if (q) {
    values.push(`%${q}%`);
    whereConditions.push(`(
      sticker_number ILIKE $${values.length}
      OR player_name ILIKE $${values.length}
      OR country ILIKE $${values.length}
      OR position ILIKE $${values.length}
    )`);
  }

  if (country) {
    values.push(`%${country}%`);
    whereConditions.push(`country ILIKE $${values.length}`);
  }

  if (status === 'missing') {
    whereConditions.push('quantity = 0');
  }

  if (status === 'owned') {
    whereConditions.push('quantity >= 1');
  }

  if (status === 'duplicate') {
    whereConditions.push('quantity > 1');
  }

  const whereClause = whereConditions.length > 0
    ? `WHERE ${whereConditions.join(' AND ')}`
    : '';

  const countResult = await pool.query(
    `SELECT COUNT(*) AS total FROM stickers ${whereClause};`,
    values,
  );

  const total = Number(countResult.rows[0].total);
  const offset = (page - 1) * limit;
  const sortColumn = ALLOWED_SORT_COLUMNS[sort] || ALLOWED_SORT_COLUMNS.id;
  const sortOrder = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

  const queryValues = [...values, limit, offset];
  const result = await pool.query(
    `SELECT * FROM stickers
    ${whereClause}
    ORDER BY ${sortColumn} ${sortOrder}
    LIMIT $${queryValues.length - 1}
    OFFSET $${queryValues.length};`,
    queryValues,
  );

  return {
    data: result.rows,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

async function getStickerById(id) {
  const result = await pool.query('SELECT * FROM stickers WHERE id = $1;', [id]);

  return result.rows[0];
}

async function getStickerStats() {
  const result = await pool.query(
    `SELECT
      COUNT(*)::INTEGER AS total,
      COUNT(*) FILTER (WHERE quantity >= 1)::INTEGER AS owned,
      COUNT(*) FILTER (WHERE quantity = 0)::INTEGER AS missing,
      COUNT(*) FILTER (WHERE quantity > 1)::INTEGER AS duplicate
    FROM stickers;`,
  );

  const stats = result.rows[0];
  const total = Number(stats.total);
  const owned = Number(stats.owned);

  return {
    total,
    owned,
    missing: Number(stats.missing),
    duplicate: Number(stats.duplicate),
    progress: total > 0 ? Math.round((owned / total) * 100) : 0,
  };
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
  getStickerStats,
  createSticker,
  updateSticker,
  deleteSticker,
};
