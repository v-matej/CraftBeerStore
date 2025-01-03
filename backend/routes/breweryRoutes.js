const express = require('express');
const router = express.Router();
const BreweryService = require('../services/breweryService');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const breweries = await BreweryService.getBreweries();
    res.json(breweries);
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
      const brewery = await BreweryService.getBreweryById(req.params.id);
      res.json(brewery);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
);

router.post('/', auth.admin(),
  validate.body({
    name: Joi.string().trim().required(),
    yearFounded: Joi.number().integer().required(),
    country: Joi.string().trim().required(),
    description: Joi.string().trim().required(),
    logoUrl: Joi.string().trim().required(),
  }),
  async (req, res) => {
    try {
      const brewery = await BreweryService.createBrewery(req.body);
      res.status(201).json(brewery);
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
    yearFounded: Joi.number().integer(),
    country: Joi.string().trim(),
    description: Joi.string().trim(),
    logoUrl: Joi.string().trim(),
  }),
  async (req, res) => {
    try {
      const brewery = await BreweryService.updateBrewery(req.params.id, req.body);
      res.json(brewery);
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
      await BreweryService.deleteBrewery(req.params.id);
      res.json({ message: 'Brewery deleted successfully' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
);

module.exports = router;
