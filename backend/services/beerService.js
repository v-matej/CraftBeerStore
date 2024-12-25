const Beer = require('../models/beer');
const Brewery = require('../models/brewery');

const getBeers = async () => {
  return await Beer.find().populate('brewery', 'name country');
};

const getBeerById = async (id) => {
  const beer = await Beer.findById(id).populate('brewery', 'name country');
  if (!beer) {
    throw new Error('Beer not found');
  }
  return beer;
};

const createBeer = async (data) => {
  const breweryExists = await Brewery.findById(data.brewery);
  if (!breweryExists) {
    throw new Error('Invalid brewery ID');
  }

  const newBeer = new Beer(data);
  return await newBeer.save();
};

const updateBeer = async (id, data) => {
  if (data.brewery) {
    const breweryExists = await Brewery.findById(data.brewery);
    if (!breweryExists) {
      throw new Error('Invalid brewery ID');
    }
  }

  const updatedBeer = await Beer.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedBeer) {
    throw new Error('Beer not found');
  }

  return updatedBeer;
};

const deleteBeer = async (id) => {
  const deletedBeer = await Beer.findByIdAndDelete(id);
  if (!deletedBeer) {
    throw new Error('Beer not found');
  }
  return deletedBeer;
};

module.exports = {
  getBeers,
  getBeerById,
  createBeer,
  updateBeer,
  deleteBeer,
};
