const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return /^(0[1-9]|[12]\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/.test(value);
        },
        message: (props) =>
          `${props.value} is not a valid date format (DD.MM.YYYY)!`,
      },
    },
    type: {
      type: String,
      enum: ["income", "expenses"],
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Transaction", transactionSchema);
