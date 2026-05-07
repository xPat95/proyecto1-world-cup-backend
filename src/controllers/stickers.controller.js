const {
  getAllStickers,
  getStickerById,
  getStickerStats: getStickerStatsModel,
  createSticker: createStickerModel,
  updateSticker: updateStickerModel,
  deleteSticker: deleteStickerModel,
} = require('../models/stickers.model');

function parsePositiveId(idParam) {
  const id = Number(idParam);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function validateStickerData(body) {
  const {
    sticker_number,
    player_name,
    country,
    position,
    notes,
  } = body;

  const quantity = body.quantity === undefined ? 0 : body.quantity;
  const parsedQuantity = Number(quantity);

  if (!sticker_number || !String(sticker_number).trim()) {
    return {
      error: 'El número de estampilla es obligatorio',
    };
  }

  if (!player_name || !String(player_name).trim()) {
    return {
      error: 'El nombre del jugador es obligatorio',
    };
  }

  if (!country || !String(country).trim()) {
    return {
      error: 'La selección o país es obligatorio',
    };
  }

  if (
    (typeof quantity === 'string' && !quantity.trim())
    || !Number.isInteger(parsedQuantity)
    || parsedQuantity < 0
  ) {
    return {
      error: 'La cantidad debe ser un número entero mayor o igual a 0',
    };
  }

  return {
    data: {
      sticker_number: String(sticker_number).trim(),
      player_name: String(player_name).trim(),
      country: String(country).trim(),
      position: position ?? null,
      quantity: parsedQuantity,
      notes: notes ?? null,
    },
  };
}

function validateGetStickersQuery(query) {
  const allowedStatuses = ['missing', 'owned', 'duplicate'];
  const allowedSortFields = [
    'id',
    'sticker_number',
    'player_name',
    'country',
    'position',
    'quantity',
    'created_at',
    'updated_at',
  ];
  const allowedOrders = ['asc', 'desc'];

  const status = query.status ? String(query.status).toLowerCase() : undefined;
  const sort = query.sort ? String(query.sort).toLowerCase() : 'id';
  const order = query.order ? String(query.order).toLowerCase() : 'asc';
  const page = query.page === undefined ? 1 : Number(query.page);
  const limit = query.limit === undefined ? 10 : Number(query.limit);

  if (status && !allowedStatuses.includes(status)) {
    return {
      error: 'El estado debe ser missing, owned o duplicate',
    };
  }

  if (!allowedSortFields.includes(sort)) {
    return {
      error: 'El campo de ordenamiento no es válido',
    };
  }

  if (!allowedOrders.includes(order)) {
    return {
      error: 'El orden debe ser asc o desc',
    };
  }

  if (!Number.isInteger(page) || page <= 0) {
    return {
      error: 'La página debe ser un número entero positivo',
    };
  }

  if (!Number.isInteger(limit) || limit <= 0) {
    return {
      error: 'El límite debe ser un número entero positivo',
    };
  }

  if (limit > 50) {
    return {
      error: 'El límite máximo permitido es 50',
    };
  }

  return {
    data: {
      q: query.q ? String(query.q).trim() : undefined,
      country: query.country ? String(query.country).trim() : undefined,
      status,
      sort,
      order,
      page,
      limit,
    },
  };
}

async function getStickers(req, res) {
  try {
    const validation = validateGetStickersQuery(req.query);

    if (validation.error) {
      return res.status(400).json({
        error: validation.error,
      });
    }

    const stickers = await getAllStickers(validation.data);

    return res.status(200).json({
      data: stickers.data,
      pagination: stickers.pagination,
    });
  } catch (error) {
    console.error('Error getting stickers:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

async function getSticker(req, res) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
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

async function getStickerStats(req, res) {
  try {
    const stats = await getStickerStatsModel();

    return res.status(200).json({
      data: stats,
    });
  } catch (error) {
    console.error('Error getting sticker stats:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

async function createSticker(req, res) {
  try {
    const validation = validateStickerData(req.body);

    if (validation.error) {
      return res.status(400).json({
        error: validation.error,
      });
    }

    const newSticker = await createStickerModel(validation.data);

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

async function updateSticker(req, res) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: 'El id de la estampilla debe ser un número válido',
      });
    }

    const validation = validateStickerData(req.body);

    if (validation.error) {
      return res.status(400).json({
        error: validation.error,
      });
    }

    const updatedSticker = await updateStickerModel(id, validation.data);

    if (!updatedSticker) {
      return res.status(404).json({
        error: 'Estampilla no encontrada',
      });
    }

    return res.status(200).json({
      data: updatedSticker,
    });
  } catch (error) {
    console.error('Error updating sticker:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

async function deleteSticker(req, res) {
  try {
    const id = parsePositiveId(req.params.id);

    if (!id) {
      return res.status(400).json({
        error: 'El id de la estampilla debe ser un número válido',
      });
    }

    const deletedSticker = await deleteStickerModel(id);

    if (!deletedSticker) {
      return res.status(404).json({
        error: 'Estampilla no encontrada',
      });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Error deleting sticker:', error);

    return res.status(500).json({
      error: 'Error interno del servidor',
    });
  }
}

module.exports = {
  getStickers,
  getSticker,
  getStickerStats,
  createSticker,
  updateSticker,
  deleteSticker,
};
