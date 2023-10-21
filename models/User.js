const Joi = require("joi");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
      minlenght: 5,
      maxlenght: 100,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      minlenght: 5,
      maxlenght: 100,
    },
    password: {
      type: String,
      require: true,
      trim: true,
      minlenght: 5,
      maxlenght: 100,
    },
    isAdmine: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
// Validate SignUp
function ValidateSignUp(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    username: Joi.string().trim().min(5).max(100).required(),
    password: Joi.string().trim().min(5).max(100).required(),
    isAdmine: Joi.bool(),
  });
  return schema.validate(obj);
}
// Validate Login
function ValidateLogin(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(5).max(100),
    password: Joi.string().trim().min(5).max(100),
    isAdmine: Joi.bool(),
  });
  return schema.validate(obj);
}
// Validate Update
function ValidateUpdate(obj) {
  const schema = Joi.object({
    email: Joi.string().trim().min(5).max(100).required().email(),
    password: Joi.string().trim().min(5).max(100).required(),
  });
  return schema.validate(obj);
}
const User = mongoose.model("User", UserSchema);
module.exports = {
  User,
  ValidateSignUp,
  ValidateLogin,
  ValidateUpdate,
};
