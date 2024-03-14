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
    expenseCategories: {
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
        january: {
          type: Number,
          default: 0,
        },
        february: {
          type: Number,
          default: 0,
        },
        march: {
          type: Number,
          default: 0,
        },
        april: {
          type: Number,
          default: 0,
        },
        may: {
          type: Number,
          default: 0,
        },
        june: {
          type: Number,
          default: 0,
        },
        july: {
          type: Number,
          default: 0,
        },
        august: {
          type: Number,
          default: 0,
        },
        september: {
          type: Number,
          default: 0,
        },
        october: {
          type: Number,
          default: 0,
        },
        november: {
          type: Number,
          default: 0,
        },
        december: {
          type: Number,
          default: 0,
        },
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
