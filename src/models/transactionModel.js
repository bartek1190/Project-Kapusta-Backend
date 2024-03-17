const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      required: true,
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
