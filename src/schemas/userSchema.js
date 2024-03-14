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
      required: [true, "Verify token is required"],
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
      default: [
        {
          date: {
            type: String,
            default: null,
          },
          description: {
            type: String,
            default: null,
          },
          amount: {
            type: Number,
            default: null,
          },
          category: {
            type: String,
            enum: [
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
            default: null,
          },
          id: {
            type: String,
            default: null,
          },
        },
      ],
    },
    incomes: {
      type: Array,
      default: [
        {
          date: {
            type: String,
            default: null,
          },
          description: {
            type: String,
            default: null,
          },
          amount: {
            type: Number,
            default: null,
          },
          category: {
            type: String,
            enum: ["Salary", "Add. income"],
            default: null,
          },
          id: {
            type: String,
            default: null,
          },
        },
      ],
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
