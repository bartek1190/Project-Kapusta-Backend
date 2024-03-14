const mongoose = require("mongoose");
const bCrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    JWT: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
    expenseCategories: {
      type: Array,
      default: [
        "Transport",
        "Products",
        "Health",
        "Alcohol",
        "Entertainment",
        "Housing",
        "Technique",
        "Communal, communication",
        "Sports, hobbies",
        "Education",
        "Other",
      ],
    },
    incomeCategories: {
      type: Array,
      default: ["Salary", "Add. income"],
    },
    expenses: {
      type: Array,
      default: [],
    },
    incomes: {
      type: Array,
      default: [],
    },
    monthStats: {
      type: Object,
      default: {
        january: 0,
        february: 0,
        march: 0,
        april: 0,
        may: 0,
        june: 0,
        july: 0,
        august: 0,
        september: 0,
        october: 0,
        november: 0,
        december: 0,
      },
    },
  },
  { versionKey: false }
);

userSchema.methods.setPassword = function (password) {
  this.password = bCrypt.hashSync(password, bCrypt.genSaltSync(6));
};

userSchema.methods.validPassword = function (password) {
  return bCrypt.compareSync(password, this.password);
};

const User = mongoose.model("user", userSchema);

module.exports = User;
