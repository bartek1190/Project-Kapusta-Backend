const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

<<<<<<< Updated upstream
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
=======
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      }, // Only required if googleId is not present
    },
    balance: {
      type: Number,
      default: 0,
    },
    token: {
      type: String,
      default: null,
    },
    googleId: {
      // Add this field for Google Auth
      type: String,
      default: null,
    },
>>>>>>> Stashed changes
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
});

userSchema.methods.setPassword = function (password) {
  this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
