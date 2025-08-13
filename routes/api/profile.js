import express from "express";
import auth from "../../middleware/auth.js";
import Profile from "../../models/Profile.js";
import User from "../../models/User.js";
import { check, validationResult } from "express-validator";

const router = express.Router();

// @route GET api/profile/me
// @desc Get current user profile
// @access Private

// Get the profile user
router.get("/me", auth, async (req, res) => {
  try {
    // find a user profile using the user ID from the request  populates means includes the name and avatar from User Schema model
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    // Check if there's no profile

    if (!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/profile
// @desc Create or update a user profile
// @access Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is required").not().isEmpty(),
      check("skills", "Skills are required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    //Check if there's an error in validation result
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    /// This field build an object start /////
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      instagram,
      facebook,
      twitter,
      youtube,
      linkedin,
    } = req.body;

    // Build Profile object
    const profileFields = {};

    profileFields.user = req.user.id;
    // These if are to check if the fields exists and if it is exist, then add or insert to profileFields object
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (status) profileFields.status = status;
    if (skills) profileFields.skills = skills;
    if (bio) profileFields.bio = bio;
    if (githubusername) profileFields.githubusername = githubusername;

    if (skills) {
      profileFields.skills = skills.split(",").map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    // These if are to check if the fields exists and if it is exist, then add or insert to profileFields.social object
    if (instagram) profileFields.social.instagram = instagram;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (youtube) profileFields.social.youtube = youtube;

    //// End /////

    try {
      // Check if profile exists
      let profile = await Profile.findOne({ user: req.user.id });

      // if a profile already exist
      if (profile) {
        // Update the profile with profileField object
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }
      // if not exist then
      // Create a new profile
      profile = new Profile(profileFields);

      await profile.save();

      res.json(profile);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route GET api/profile
// @desc Get all profiles
// @access Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route GET api/profile/user/:user_id
// @desc Get profile by user Id
// @access Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found" });
    }

    res.json(profile);
  } catch (error) {
    console.error(error.message);

    if (error.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE api/profile
// @desc Delete profile, user & posts
// @access Private

router.delete("/", auth, async (req, res) => {
  try {
    // This will delete Profle and User
    await Profile.findOneAndDelete({ user: req.user.id });
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});
export default router;
