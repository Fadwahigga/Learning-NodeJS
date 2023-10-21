const Joi = require("joi");
const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    tittle: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Author",
    },
    description: {
      type: String,
      required: true,
        trim: true,
      minlength:5,
    },
    price: {
      type: Number,
      required: true,
      trim: true,
      min: 0,
    },
    cover: {
      type: String,
      required: true,
      enum: ["soft cover", "hard cover"],
    },
  },
  { timestamps: true }
);
// Validate Add Book
function ValidateAddBook(obj) {
  const schema = Joi.object({
    cover: Joi.string().valid("soft cover", "hard cover").required(),
    tittle: Joi.string().trim().min(3).max(100).required(),
    description: Joi.string().trim().min(3).max(100).required(),
    author: Joi.string().required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}

// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    cover: Joi.string().trim(),
    tittle: Joi.string().trim().min(3).max(100),
    description: Joi.string().trim().min(5),
    author: Joi.string().trim(),
    price: Joi.number().min(0),
  });
  return schema.validate(obj);
}
const Book = mongoose.model("Book", BookSchema);
module.exports = {
  Book,
  ValidateAddBook,
  validateUpdateBook,
};
