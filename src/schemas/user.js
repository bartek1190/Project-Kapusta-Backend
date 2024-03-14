import mongoose from "mongoose";
import { Schema } from "mongoose";

const user = new Schema(
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
    token: {
      type: String,
      default: null,
    },
    balance: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const User = mongoose.model("user", user);

export default User;
