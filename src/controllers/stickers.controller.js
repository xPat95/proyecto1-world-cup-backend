const {
  getAllStickers,
  getStickerById,
  createSticker: createStickerModel,
} = require('../models/stickers.model');

async function getStickers(req, res) {
  try {
    const stickers = await getAllStickers();

    res.status(200).json({
      data: stickers,
    });
  } catch (error) {
    console.error('Error getting stickers:', error);

    res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

async function getSticker(req, res) {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({
        error: 'El id de la estampilla debe ser un número válido',
      });
    }

    const sticker = await getStickerById(id);

    if (!sticker) {
      return res.status(404).json({
        error: 'Estampilla no encontrada',
      });
    }

    return res.status(200).json({
      data: sticker,
    });
  } catch (error) {
    console.error('Error getting sticker:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

async function createSticker(req, res) {
  try {
    const {
      sticker_number,
      player_name,
      country,
      position,
      notes,
    } = req.body;

    const quantity = req.body.quantity === undefined ? 0 : req.body.quantity;
    const parsedQuantity = Number(quantity);

    if (!sticker_number || !String(sticker_number).trim()) {
      return res.status(400).json({
        error: 'El número de estampilla es obligatorio',
      });
    }

    if (!player_name || !String(player_name).trim()) {
      return res.status(400).json({
        error: 'El nombre del jugador es obligatorio',
      });
    }

    if (!country || !String(country).trim()) {
      return res.status(400).json({
        error: 'La selección o país es obligatorio',
      });
    }

    if (
      (typeof quantity === 'string' && !quantity.trim())
      || !Number.isInteger(parsedQuantity)
      || parsedQuantity < 0
    ) {
      return res.status(400).json({
        error: 'La cantidad debe ser un número entero mayor o igual a 0',
      });
    }

    const newSticker = await createStickerModel({
      sticker_number: String(sticker_number).trim(),
      player_name: String(player_name).trim(),
      country: String(country).trim(),
      position: position ?? null,
      quantity: parsedQuantity,
      notes: notes ?? null,
    });

    return res.status(201).json({
      data: newSticker,
    });
  } catch (error) {
    console.error('Error creating sticker:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

module.exports = {
  getStickers,
  getSticker,
  createSticker,
};
