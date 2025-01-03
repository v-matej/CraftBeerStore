const User = require('../models/user');
const CartItem = require('../models/cartItem');
const FavoriteItem = require('../models/favoriteItem');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req) => {
  const { email, password, role } = req;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser = new User({
    email,
    password,
    role,
  });

  await newUser.save();

  const token = jwt.sign(
    { user: { id: newUser.id, role: newUser.role } },
    process.env.JWT_SECRET
    // { expiresIn: '1h' }
  );

  return token;
};

const loginUser = async (req) => {
  const { email, password } = req;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { user: { id: user.id, role: user.role } },
    process.env.JWT_SECRET
    // { expiresIn: '1h' }
  );

  return token;
};

const getUsers = async () => {
  return await User.find();
};

const getUserById = async (id) => {
  const user = await User.findById(id).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

const createUser = async ({ email, password, role }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    password: hashedPassword,
    role,
  });

  await newUser.save();

  return newUser;
};

const deleteUser = async (id) => {
  await CartItem.deleteMany({ user: id });
  await FavoriteItem.deleteMany({ user: id });

  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

const updateUser = async (id, updates) => {
  const user = await User.findById(id);
  if (!user) {
    throw new Error('User not found');
  }

  Object.keys(updates).forEach((key) => {
    user[key] = updates[key];
  });

  const updatedUser = await user.save();
  return updatedUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  createUser,
  deleteUser,
  getUserById,
  updateUser,
};
