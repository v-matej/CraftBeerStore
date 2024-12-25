const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const breweryRoutes = require('./routes/breweryRoutes');
const beerRoutes = require('./routes/beerRoutes');
const userRoutes = require('./routes/userRoutes');
const cartRoutes = require('./routes/cartRoutes');
const favoriteRoutes = require('./routes/favoriteRoutes');

require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

mongoose.connect('mongodb://root:root@localhost:27017/craft_beer?authSource=admin');

app.use('/api/brewery', breweryRoutes);
app.use('/api/beer', beerRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/favorite', favoriteRoutes);

app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));