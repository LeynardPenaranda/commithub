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

// @route GET api/posts
// @desc Get all posts
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    if (!posts || posts.length === 0) {
      return res.status(404).json({ msg: "No posts found" });
    }

    res.json(posts);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route GET api/posts/:id
// @desc Get user posts
// @access Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post || post.length === 0) {
      return res.status(404).json({ msg: "No post found for this user" });
    }

    res.json(post);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not Found" });
    }

    res.status(500).json({ msg: "Server Error" });
  }
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the user have a post
    if (!post || post.length === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }
    // Check the user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // delete the or remove the post
    await post.deleteOne();

    // return the response
    res.json({ msg: "Post removed successfully" });
  } catch (error) {
    console.error(error.message);
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

// @route PUT api/posts/like/:id
// @desc Update a post or like a post
// @access Private
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if there's a post
    if (!post || post.length === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if a post already liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    // if post not liked yet save the user id to the likes array
    post.likes.unshift({ user: req.user.id });
    // then save into the database
    await post.save();
    // return the updated likes array
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});
// @route PUT api/posts/unlike/:id
// @desc Update a post or unlike a post
// @access Private
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if there's a post
    if (!post || post.length === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if a post still not liked
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has been still not liked yet" });
    }

    // get the index of the user like
    const removeIndex = post.likes.map((like) =>
      like.user.toString().indexOf(req.user.id)
    );
    // remove that index from the array
    post.likes.splice(removeIndex, 1);
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

export default router;
