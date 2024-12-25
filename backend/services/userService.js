const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req) => {
  const {email, password, role} = req;

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

  const token = jwt.sign(
    { user: { id: newUser.id, role: newUser.role } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

const loginUser = async (req) => {
  const {email, password} = req;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { user: { id: user.id, role: user.role } },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return token;
};

const getUsers = async () => {
  return await User.find();
};

const deleteUser = async (id) => {
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) {
    throw new Error('User not found');
  }
  return deletedUser;
};

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  deleteUser,
};
