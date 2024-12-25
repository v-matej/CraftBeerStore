const express = require('express');
const router = express.Router();
const FavoriteService = require('../services/favoriteService');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const Joi = require('joi');
const jwt =require('../utils/jwt');

router.get('/', auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);

  try {
    const items = await FavoriteService.getFavoriteItems(userId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth.user(),
validate.body({
  productId: Joi.string().trim().required(),
}), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);
  const { productId } = req.body;

  try {
    const item = await FavoriteService.addFavoriteItem(userId, productId);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:productId', 
  validate.params({
    productId: Joi.string().trim().required(),
  }), auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);
  const { productId } = req.params;

  try {
    await FavoriteService.removeFavoriteItem(userId, productId);
    res.json({ message: 'Item removed from favorites' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
