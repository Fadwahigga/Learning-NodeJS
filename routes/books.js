const express = require("express");
const router = express.Router();
const {
  Book,
  ValidateAddBook,
  validateUpdateBook,
} = require("../models/Books");

/**
 * @des Get All Books
 * @route /books
 * @method Get
 * @access public
 */

router.get("/", async (req, res) => {
  try {
    const bookList = await Book.find();
    // .sort({ firstName: 1 })
    // .select("firstName lastName -_id");
    res.status(200).json(bookList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
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
  const book = books.find((b) => b.id === parseInt(req.params.id));
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
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (book) {
    res.status(200).json({ menubar: "Book has been deleted" });
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});

module.exports = router;
