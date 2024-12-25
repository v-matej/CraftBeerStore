const mongoose = require('mongoose');

const beerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  alcoholPercentage: { type: Number, required: true, min: 0, max: 100 },
  color: { type: String, required: true },
  type: { type: String, required: true },
  brewery: { type: mongoose.Schema.Types.ObjectId, ref: 'Brewery', required: true },
});

module.exports = mongoose.model('Beer', beerSchema);
