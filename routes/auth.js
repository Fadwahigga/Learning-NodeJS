const express = require("express");
const router = express.Router();
const {
  User,
  ValidateSignUp,
  ValidateUpdate,
  ValidateLogin,
} = require("../models/User");
/**
 * @des SignUp
 * @route /SignUp
 * @method Post
 * @access public
 */
router.post("/Signup", async (req, res) => {
  const { error } = ValidateSignUp(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: "This user already exist" });
    }
    user = new User({
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
      isAdmine: req.body.isAdmine,
    });
      const result = user.save();
      res.status(200).json(result);
  } catch (error) {console.log(error);
  res.status(500).json({ message: "Something want wrong" });}
});
