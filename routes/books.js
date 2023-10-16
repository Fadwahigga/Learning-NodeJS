const express = require("express");
const Joi = require("joi");
const router = express.Router();

const books = [
  { id: 1, name: "book1", tittle: "neww", author: "fadwa", price: "203" },
  { id: 2, name: "book2", tittle: "newwww", author: "fadwwwa", price: "200" },
  { id: 3, name: "book3", tittle: "newew", author: "fadwaaa", price: "20" },
];
// router.get("/", (req, res) => {
//   res.send("Hi from nodemon");
// });

/**
 * @des Get All Books
 * @route /books
 * @method Get
 * @access public
 */

router.get("/", (req, res) => {
  res.json(books);
});

/**
 * @des Get Book By Id
 * @route /books
 * @method Get
 * @access public
 */
router.get("/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
/**
 * @des Add New Book
 * @route /books
 * @method Post
 * @access public
 */
router.post("/", (req, res) => {
  const { error } = validateCreateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = {
    id: books.length + 1,
    name: req.body.name,
    tittle: req.body.tittle,
    author: req.body.author,
    price: req.body.price,
  };
  console.log(book);
  books.push(book);
  res.status(201).json(book); //201 created successfully
});

/**
 * @des Udpate a Book
 * @route /books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  if (book) {
    res.status(200).json({ menubar: "Book has been updated" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});
/**
 * @des Delete a Book
 * @route /books/:id
 * @method Delete
 * @access public
 */
router.delete("/:id", (req, res) => {
  if (book) {
    res.status(200).json({ menubar: "Book has been updated" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

// Validate Add Book
function validateCreateBook(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(100).required(),
    tittle: Joi.string().trim().min(3).max(100).required(),
    author: Joi.string().trim().min(3).max(100).required(),
    price: Joi.number().min(0).required(),
  });
  return schema.validate(obj);
}

// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(100),
    tittle: Joi.string().trim().min(3).max(100),
    author: Joi.string().trim().min(3).max(100),
    price: Joi.number().min(0),
  });
  return schema.validate(obj);
}
module.exports = router;
