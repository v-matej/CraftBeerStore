const express = require('express');
const router = express.Router();
const BeerService = require('../services/beerService');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const beers = await BeerService.getBeers();
    res.json(beers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id',
  validate.params({
    id: Joi.string().trim().required(),
  }),
  async (req, res) => {
    try {
      const beer = await BeerService.getBeerById(req.params.id);
      res.json(beer);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
);

router.post('/', auth.admin(),
  validate.body({
    name: Joi.string().trim().required(),
    price: Joi.number().raw().required(),
    alcoholPercentage: Joi.number().raw().required(),
    color: Joi.string().trim().required(),
    type: Joi.string().trim().required(),
    brewery: Joi.string().trim().required(),
  }),
  async (req, res) => {
    try {
      const beer = await BeerService.createBeer(req.body);
      res.status(201).json(beer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.put('/:id', auth.admin(),
  validate.params({
    id: Joi.string().trim().required(),
  }),
  validate.body({
    _id: Joi.string().trim(),
    __v: Joi.number().integer(),
    name: Joi.string().trim(),
    price: Joi.number().raw(),
    alcoholPercentage: Joi.number().raw(),
    color: Joi.string().trim(),
    type: Joi.string().trim(),
    brewery: Joi.string().trim(),
  }),
  async (req, res) => {
    try {
      const beer = await BeerService.updateBeer(req.params.id, req.body);
      res.json(beer);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.delete('/:id', auth.admin(),
  validate.params({
    id: Joi.string().trim().required(),
  }),
  async (req, res) => {
    try {
      await BeerService.deleteBeer(req.params.id);
      res.json({ message: 'Beer deleted successfully' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
);

module.exports = router;