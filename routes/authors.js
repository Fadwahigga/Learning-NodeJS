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
module.exports = router;
