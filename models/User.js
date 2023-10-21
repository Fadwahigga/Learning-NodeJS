const Joi = require("joi");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
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
}, { timestamps: true });
// Validate Login
function ValidateLogin(obj) {
  const schema = Joi.object({
    cover: Joi.string().valid("soft cover", "hard cover").required(),
    tittle: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().min(3).max(100).required(),
    author: Joi.string().required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}
const User = mongoose.model("User", UserSchema);
module.exports = {
    User,
}
