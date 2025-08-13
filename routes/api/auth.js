import express from "express";
import auth from "../../middleware/auth.js";
import User from "../../models/User.js";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "config";
import bcrypt from "bcryptjs";

const router = express.Router();

// @route POST api/auth
// @desc Login or authenticate user and get token
// @access Public

// This will get a user's information if valid token
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// this will login user and check if exist
router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Input by the users
    const { email, password } = req.body;

    try {
      // going to find a user using email to the database
      let user = await User.findOne({ email });

      //see if user does not exists
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      //if user exist then
      // Check if password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),

        // how long the token will be valid
        { expiresIn: 360000 },
        (err, token) => {
          //if error throw new error
          if (err) throw err;
          // if not then response with token object
          res.json({ token });
        }
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

export default router;
