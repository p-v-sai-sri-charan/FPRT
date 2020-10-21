import mongoose from "mongoose";
const Schema = mongoose.Schema;
import jwt from "jsonwebtoken";
import crypto from "crypto";
import Token from "../models/token.js";

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: "Your email is required",
      trim: true,
    },

    username: {
      type: String,
      unique: true,
      required: false,
      index: true,
      sparse: true,
    },
    password: {
      type: String,
      required: "Your password is required",
      max: 100,
    },

    fullname: {
      type: String,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  { timestamps: true }
);


UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  let payload = {
    id: this._id,
    email: this.email,
    username: this.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};

UserSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

UserSchema.methods.generateVerificationToken = function () {
  let payload = {
    userId: this._id,
    token: crypto.randomBytes(20).toString("hex"),
  };

  return new Token(payload);
};

export default mongoose.model("User", UserSchema);
