const mongoose = require('mongoose');
const Brewery = require('../models/Brewery');
const Beer = require('../models/Beer');


mongoose.connect('mongodb://root:root@localhost:27017/craft_beer?authSource=admin');
  

const breweries = [
  {
    name: 'Medvedgrad Brewery',
    yearFounded: 1994,
    country: 'Croatia',
    description: 'One of the oldest and most renowned craft breweries in Croatia.',
    logoUrl: 'https://example.com/medvedgrad-logo.png',
  },
  {
    name: 'Zadruga Brewery',
    yearFounded: 2009,
    country: 'Croatia',
    description: 'A cooperative brewery producing unique craft beers.',
    logoUrl: 'https://example.com/zadruga-logo.png',
  },
  {
    name: 'Brlog Brewery',
    yearFounded: 2016,
    country: 'Croatia',
    description: 'Female-led craft brewery known for innovation.',
    logoUrl: 'https://example.com/brlog-logo.png',
  },
];

const beers = [
  {
    name: 'Zlatni Medvjed',
    price: 3.5,
    alcoholPercentage: 5.2,
    color: 'Pale',
    type: 'Lager',
    brewery: null,
  },
  {
    name: 'Crna Kraljica',
    price: 4.0,
    alcoholPercentage: 6.5,
    color: 'Dark',
    type: 'Stout',
    brewery: null,
  },
  {
    name: 'Plavuša',
    price: 3.8,
    alcoholPercentage: 4.5,
    color: 'Amber',
    type: 'Ale',
    brewery: null,
  },
];

async function seedDatabase() {
  try {
    await Brewery.deleteMany({});
    await Beer.deleteMany({});
    console.log('Existing data cleared.');

    const insertedBreweries = await Brewery.insertMany(breweries);
    console.log(`${insertedBreweries.length} breweries added.`);

    beers[0].brewery = insertedBreweries[0]._id;
    beers[1].brewery = insertedBreweries[0]._id;
    beers[2].brewery = insertedBreweries[1]._id;

    const insertedBeers = await Beer.insertMany(beers);
    console.log(`${insertedBeers.length} beers added.`);

    console.log('Database seeding completed successfully!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedDatabase();
