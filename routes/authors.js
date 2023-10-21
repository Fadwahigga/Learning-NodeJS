const express = require("express");
const router = express.Router();
const {
  Author,
  ValidateAddAuthor,
  ValidateUpdatAuthor,
} = require("../models/Authors");

/**
 * @des Get All authors
 * @route /authors
 * @method Get
 * @access public
 */
router.get("/", async (req, res) => {
  try {
    const authorList = await Author.find();
    // .sort({ firstName: 1 })
    // .select("firstName lastName -_id");
    res.status(200).json(authorList);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
/**
 * @des Get author By Id
 * @route /authors
 * @method Get
 * @access public
 */
router.get("/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});
/**
 * @des Add New Author
 * @route /author
 * @method Post
 * @access public
 */
router.post("/", async (req, res) => {
  const { error } = ValidateAddAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const author = new Author({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      nationality: req.body.nationality,
      image: req.body.image,
    });
    const result = await author.save();
    res.status(201).json(author);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something want wrong" });
  }

  //201 created successfully
});

/**
 * @des Udpate  Author
 * @route /author/:id
 * @method PUT
 * @access public
 */
router.put("/:id", async (req, res) => {
  const { error } = ValidateUpdatAuthor(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        nationality: req.body.nationality,
        image: req.body.image,
      },
    },
    { new: true }
  );
  // const author = authors.find((b) => b.id === parseInt(req.params.id));
  // if (author) {
  //   res.status(200).json({ menubar: "Author has been updated" });
  // } else {
  //   res.status(404).json({ message: "Author not found" });
  // }
  res.status(200).json(author);
});

/**
 * @des Delete Author
 * @route /author/:id
 * @method Delete
 * @access public
 */
router.delete("/:id", async (req, res) => {
  try {
    const author = Author.findById(req.params.id);
    if (author) {
      await Author.findByIdAndDelete(req.params.id);
      res.status(200).json({ menubar: "Author has been deleted" });
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something want wrong" });
  }
});

module.exports = router;
