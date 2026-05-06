const express = require('express');
const {
  getStickers,
  getSticker,
} = require('../controllers/stickers.controller');

const router = express.Router();

router.get('/', getStickers);
router.get('/:id', getSticker);

module.exports = router;
