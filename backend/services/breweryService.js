const Brewery = require('../models/brewery');

const getBreweries = async () => {
  return await Brewery.find();
};

const getBreweryById = async (id) => {
  const brewery = await Brewery.findById(id);
  if (!brewery) {
    throw new Error('Brewery not found');
  }
  return brewery;
};

const createBrewery = async (data) => {
  const newBrewery = new Brewery(data);
  return await newBrewery.save();
};

const updateBrewery = async (id, data) => {
  const updatedBrewery = await Brewery.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!updatedBrewery) {
    throw new Error('Brewery not found');
  }

  return updatedBrewery;
};

const deleteBrewery = async (id) => {
  const deletedBrewery = await Brewery.findByIdAndDelete(id);
  if (!deletedBrewery) {
    throw new Error('Brewery not found');
  }

  return deletedBrewery;
};

module.exports = {
  getBreweries,
  getBreweryById,
  createBrewery,
  updateBrewery,
  deleteBrewery,
};
