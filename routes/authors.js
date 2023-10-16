const express = require("express");
const Joi = require("joi");
const router = express.Router();
const authors = [
  {
    id: 1,
    first_name: "fadwa",
    last_name: "ali",
    nationality: "sudan",
    image: "default.png",
  },
  {
    id: 2,
    first_name: "fadwa",
    last_name: "ali",
    nationality: "sudan",
    image: "default.png",
  },
  {
    id: 3,
    first_name: "fadwa",
    last_name: "ali",
    nationality: "sudan",
    image: "default.png",
  },
];
/**
 * @des Get All authors
 * @route /authors
 * @method Get
 * @access public
 */
router.get("/", (req, res) => {
  res.status(200).json(authors);
});
/**
 * @des Get author By Id
 * @route /authors
 * @method Get
 * @access public
 */
router.get("/:id",(req,res)=>{
    const author = authors.find((a)=> a.id === parseInt(req.params.id));
    if(author){
        res.status(200).json(author);
    }else{
        res.status(404).json({message:"Author not found"});
    }
})
/**
 * @des Add New Author
 * @route /author
 * @method Post
 * @access public
 */
router.post("/", (req, res) => {
    const { error } = ValidateAddBook(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const author = {
        id: authors.length +1,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        nationality: req.body.nationality,
        image: req.body.image,
    };
    console.log(author);
    authors.push(author);
    res.status(201).json(author); //201 created successfully
  });



// Validate Add Author
  function  ValidateAddBook(obj) {
    const schema = Joi.object({
      first_name: Joi.string().trim().min(3).max(100).required(),
      last_name: Joi.string().trim().min(3).max(100).required(),
      nationality: Joi.string().trim().min(3).max(100).required(),
      image: Joi.string().required(),
    });
    return schema.validate(obj);
  }
module.exports = router;
