const { string } = require("joi");
const mongoose = require("mongoose");
const AuthorSchema = new mongoose.Schema({
  first_name: {
    type: string,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  last_name: {
    type: string,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  nationality: {
    type: string,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100,
  },
  image: {
    type: string,
    default: "defult.png",
  },
  timestamps: true,
});
const Author = mongoose.model("Author", AuthorSchema);
model.export={
    Author
}