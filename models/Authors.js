const Joi = require("joi");
const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: {
      type: String,
      default: "defult.png",
    },
  },
  { timestamps: true }
);
// Validate Add Author
function ValidateAddAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(100).required(),
    lastName: Joi.string().trim().min(3).max(100).required(),
    nationality: Joi.string().trim().min(3).max(100).required(),
    image: Joi.string(),
  });
  return schema.validate(obj);
}
// Validate Update Author
function ValidateUpdatAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(100),
    lastName: Joi.string().trim().min(3).max(100),
    nationality: Joi.string().trim().min(3).max(100),
    image: Joi.string(),
  });
  return schema.validate(obj);
}
const Author = mongoose.model("Author", AuthorSchema);
module.exports = {
  Author,
  ValidateAddAuthor,
  ValidateUpdatAuthor,
};
