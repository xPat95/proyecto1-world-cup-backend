const express = require('express');
const {
  getStickers,
  getSticker,
  createSticker,
} = require('../controllers/stickers.controller');

const router = express.Router();

router.get('/', getStickers);
router.post('/', createSticker);
router.get('/:id', getSticker);

module.exports = router;
