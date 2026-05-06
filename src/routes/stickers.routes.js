const express = require('express');
const {
  getStickers,
  getSticker,
  createSticker,
  updateSticker,
  deleteSticker,
} = require('../controllers/stickers.controller');

const router = express.Router();

router.get('/', getStickers);
router.post('/', createSticker);
router.get('/:id', getSticker);
router.put('/:id', updateSticker);
router.delete('/:id', deleteSticker);

module.exports = router;
