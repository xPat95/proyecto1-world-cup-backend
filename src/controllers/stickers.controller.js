const {
  getAllStickers,
  getStickerById,
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

module.exports = {
  getStickers,
  getSticker,
};
