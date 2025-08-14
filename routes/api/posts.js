import express from "express";
import auth from "../../middleware/auth.js";
import { check, validationResult } from "express-validator";
import User from "../../models/User.js";
import Profile from "../../models/Profile.js";
import Post from "../../models/Post.js";
const router = express.Router();

// @route POST api/posts
// @desc Create a post
// @access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // get the user from the token
      const user = await User.findById(req.user.id).select("-password");

      // create an object for post model
      const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      });

      // save the post into the database
      const post = await newPost.save();
      //return the post by response
      res.json(post);
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

export default router;
