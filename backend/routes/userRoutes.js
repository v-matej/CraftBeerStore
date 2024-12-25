const express = require('express');
const router = express.Router();
const UserService = require('../services/userService');
const validate = require('../middleware/validate');
const Joi = require('joi');
const auth = require('../middleware/auth');
const BlacklistedToken = require('../models/blacklistedToken');
const jwt = require('jsonwebtoken');

router.post('/register',
  validate.body({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
    role: Joi.string().valid('user', 'admin')
  }),
  async (req, res) => {
    try {
      const token = await UserService.registerUser(req.body);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post('/login',
  validate.body({
    email: Joi.string().email().required(),
    password: Joi.string().trim().required(),
  }),
  async (req, res) => {
    try {
      const token = await UserService.loginUser(req.body);
      res.json({ token });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
);

router.post('/logout', auth.user(), async (req, res) => {
  const token = req?.headers?.authorization?.split(' ')[1];
  if (!token) {
    return res.status(400).json({ msg: 'No token provided' });
  }

  try {
    const decoded = jwt.decode(token);
    const expiryDate = new Date(decoded.exp * 1000);

    const blacklistedToken = new BlacklistedToken({ token, expiryDate });
    await blacklistedToken.save();

    res.json({ msg: 'Logout successful' });
  } catch (err) {
    res.status(500).json({ msg: 'Error logging out' });
  }
});

router.get('/', auth.admin(), async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth.admin(), async (req, res) => {
  try {
    await UserService.deleteUser(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

module.exports = router;
