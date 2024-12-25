const mongoose = require('mongoose');

const brewerySchema = new mongoose.Schema({
  name: { type: String, required: true },
  yearFounded: { type: Number, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  logoUrl: { type: String, required: true, match: /^(http|https):\/\/[^ "]+$/ },
});

module.exports = mongoose.model('Brewery', brewerySchema);
