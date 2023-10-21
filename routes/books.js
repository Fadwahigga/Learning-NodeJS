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
    const bookList = await Book.find().populate("author");
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
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
/**
 * @des Add New Book
 * @route /books
 * @method Post
 * @access public
 */
router.post("/", async (req, res) => {
  const { error } = ValidateAddBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const book = new Book({
      tittle: req.body.tittle,
      author: req.body.author,
      description: req.body.description,
      price: req.body.price,
      cover: req.body.cover
    });
    const result = await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something want wrong" });
  }

  //201 created successfully
});

/**
 * @des Udpate a Book
 * @route /books/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = validateUpdateBook(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const book = await Book.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        tittle: req.body.tittle,
        author: req.body.author,
        description: req.body.description,
        price: req.body.price,
        cover: req.body.cover,
      },
    },
    { new: true }
  );
  res.status(200).json(book);
});
/**
 * @des Delete a Book
 * @route /books/:id
 * @method Delete
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const book = Book.findById(req.params.id);
    if (book) {
      await Book.findByIdAndDelete(req.params.id);
      res.status(200).json({ menubar: "Book has been deleted" });
    } else {
      res.status(404).json({ message: "Book not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something want wrong" });
  }
});

module.exports = router;
