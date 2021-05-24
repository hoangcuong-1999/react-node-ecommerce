const express = require("express");
const User = require("../models/userModel");

const authRouter = express.Router();

authRouter.get("/confirm/:confirmationCode", async (req, res) => {
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });
  if (user) {
    user.status = "active";
    await user.save();
  }
});

module.exports = authRouter;
