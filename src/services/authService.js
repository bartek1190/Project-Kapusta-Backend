const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");

const register = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const user = new User({ email });
  user.setPassword(password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  return { user };
};

const login = async (userData) => {
  const { email, password } = userData;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
};

const logout = async (userId) => {
  try {
    const user = await User.find({ _id: userId });
    if (!user.token) {
      return user;
    }
    const id = new ObjectId(userId);
    await User.updateOne({ _id: id }, { $set: { token: null } });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { register, login, logout };
