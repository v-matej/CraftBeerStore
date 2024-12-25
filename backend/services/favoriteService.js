const FavoriteItem = require('../models/favoriteItem');
const Beer = require('../models/beer');

class FavoriteService {
  static async getFavoriteItems(userId) {
    return FavoriteItem.find({ user: userId }).populate('product', 'name price');
  }

  static async addFavoriteItem(userId, productId) {
    const productExists = await Beer.findById(productId);
    if (!productExists) throw new Error('Invalid product ID');

    const existingItem = await FavoriteItem.findOne({ user: userId, product: productId });
    if (existingItem) return existingItem;

    const newItem = new FavoriteItem({ user: userId, product: productId });
    return newItem.save();
  }

  static async removeFavoriteItem(userId, productId) {
    return FavoriteItem.findOneAndDelete({ user: userId, product: productId });
  }
}

module.exports = FavoriteService;