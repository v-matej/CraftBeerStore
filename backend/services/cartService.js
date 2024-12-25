const CartItem = require('../models/cartItem');
const Beer = require('../models/beer');

class CartService {
  static async getCartItems(userId) {
    return CartItem.find({ user: userId }).populate('product', 'name price');
  }

  static async addCartItem(userId, reqBody) {
    const { productId, quantity } = reqBody;

    const productExists = await Beer.findById(productId);
    if (!productExists) throw new Error('Invalid product ID');

    const existingItem = await CartItem.findOne({ user: userId, product: productId });
    if (existingItem) {
      existingItem.quantity += (quantity || 1);
      return existingItem.save();
    }

    const newItem = new CartItem({ user: userId, product: productId, quantity });
    return newItem.save();
  }

  static async updateCartItem(userId, paramProductId, reqBody) {
    const { productId, quantity } = reqBody;

    if(paramProductId != productId) throw new Error('Missmatching product identifiers')

    const item = await CartItem.findOne({ user: userId, product: productId });
    if (!item) throw new Error('Cart item not found');

    if (quantity <= 0) {
      return this.removeCartItem(item);
    }

    item.quantity = quantity;
    return item.save();
  }

  static async removeCartItem(cartItem) {

    return await CartItem.findOneAndDelete(cartItem);
  }

  static async clearCart(userId) {
    return CartItem.deleteMany({ user: userId });
  }
}

module.exports = CartService;