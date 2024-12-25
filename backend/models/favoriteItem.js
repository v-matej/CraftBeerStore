const mongoose = require('mongoose');

const favoriteItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Beer',
    required: true,
  },
});

module.exports = mongoose.model('FavoriteItem', favoriteItemSchema);