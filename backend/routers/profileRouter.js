const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const { isAuth, isAdmin } = require("../utils");

const profileRouter = express.Router();

// So some account will not have profile yet, we have to use user id instead
profileRouter.get(
  "/mine",
  isAuth,
  expressAsyncHandler((req, res) => {
    Profile.findOne({ user: req.user }, function (err, obj) {
      if (err) return res.status(400).send(err.message);
      res.send(obj);
    });
  })
);

//=== User create profile
profileRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    // findOneAndUpdate with options => Create document if not exists, otherwise, update- return document in either case
    const query = { user: req.user };
    const update = {
      city: req.body.city,
      province: req.body.province,
      name: req.body.name,
      phone: req.body.phone,
      address: req.body.address,
      user: req.user,
    };
    const options = { upsert: true, new: true, setDefaultsOnInsert: true };
    // Find the document
    const createdProfile = await Profile.findOneAndUpdate(
      query,
      update,
      options
    );
    // Update User collection
    const user = await User.findById(req.user._id);
    user.profile = createdProfile;
    try {
      const updatedUser = await user.save();
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
    res.send(createdProfile);
  })
);

module.exports = profileRouter;
