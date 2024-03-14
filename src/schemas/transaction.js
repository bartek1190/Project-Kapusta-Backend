import mongoose from "mongoose";
import { Schema } from "mongoose";

const transaction = new Schema(
  {
    date: {
      type: String,
    },
    description: {
      type: String,
      minlength: 2,
      required: [true, "Set description for transaction"],
    },
    amount: {
      type: Number,
      default: 0,
      required: [true, "Set amount for transaction"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false }
);

const Transaction = mongoose.model("transaction", transaction);

export default Transaction;
