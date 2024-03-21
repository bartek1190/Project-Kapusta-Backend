const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const md5 = require("md5");

const register = async (userData) => {
  const { email, password } = userData;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }
  const firstLetter = email[0].toUpperCase();
  const avatarUrl = `https://ui-avatars.com/api/?name=${firstLetter}&background=random&size=128`;

  const user = new User({ email, avatarUrl });
  user.setPassword(password);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  user.token = token;
  await user.save();

  return {
    user: {
      email: user.email,
      balance: user.balance,
      avatarUrl: user.avatarUrl,
      token: user.token,
    },
  };
};

const login = async (userData) => {
  const { email, password } = userData;
  const registeredUser = await User.findOne({ email });
  if (
    !registeredUser ||
    !bcrypt.compareSync(password, registeredUser.password)
  ) {
    throw new Error("Invalid credentials");
  }
  if (registeredUser.token) {
    return 400;
  }
  const token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  await User.findOneAndUpdate({ _id: registeredUser._id }, { $set: { token } });
  const user = await User.findOne({ email });
  return {
    user: {
      email: user.email,
      balance: user.balance,
      avatarUrl: user.avatarUrl,
      token: user.token,
    },
  };
};

const logout = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user || !user.token) {
      return 400;
    }
    const id = new ObjectId(userId);
    console.log(id);
    await User.updateOne({ _id: id }, { $set: { token: null } });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { register, login, logout };
