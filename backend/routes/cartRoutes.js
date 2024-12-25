const express = require('express');
const router = express.Router();
const CartService = require('../services/cartService');
const auth = require('../middleware/auth');
const jwt = require('../utils/jwt');
const validate = require('../middleware/validate');
const Joi = require('joi');

router.get('/', auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);

  try {
    const items = await CartService.getCartItems(userId);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth.user(), 
validate.body({
  productId: Joi.string().trim().required(),
  quantity: Joi.number()
}), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);
  try {
    const item = await CartService.addCartItem(userId, req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:productId',
validate.params({
  productId: Joi.string().trim().required()
}), validate.body({
  productId: Joi.string().trim().required(),
  quantity: Joi.number().integer().required()
  }), auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);
  paramProductId = req.params.productId;

  try {
    const item = await CartService.updateCartItem(userId, paramProductId, req.body);
    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:productId',
validate.params({
  productId: Joi.string().trim().required()
}), auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);
  
  try {
    await CartService.removeCartItem(userId, req.params);
    res.json({ message: 'Item removed from cart' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/', auth.user(), async (req, res) => {
  userId = jwt.getUserIdFromJwt(req);

  try {
    await CartService.clearCart(userId);
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;