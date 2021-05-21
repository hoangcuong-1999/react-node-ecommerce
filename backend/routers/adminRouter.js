const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const {
  generateToken,
  isAuth,
  validateSigninRequest,
  isSigninRequestValidated,
} = require("../utils");

const adminRouter = express.Router();

// adminRouter.get(
//   "/seed",
//   expressAsyncHandler(async (req, res) => {
//     const createdUsers = await User.insertMany(data.users);
//     res.send(createdUsers);
//   })
// );

adminRouter.post(
  "/signin",
  validateSigninRequest,
  isSigninRequestValidated,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(401)
        .send({ message: "Invalid email, please try again !" });
    else {
      // user exist then check password
      const pwdMatch = bcrypt.compareSync(req.body.password, user.password);
      if (!pwdMatch)
        return res
          .status(401)
          .send({ message: "Password doesn't match, please try again !" });
    }

    // If everything OK
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

// adminRouter.post(
//   "/register",
//   expressAsyncHandler(async (req, res) => {
//     // name, email, password
//     // check email
//     const existUser = await User.findOne({ email: req.body.email });
//     if (existUser)
//       return res.status(409).send({
//         message: "Email is already taken, please try another email !",
//       });

//     // else, create new user
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: bcrypt.hashSync(req.body.password),
//       isAdmin: false,
//     });

//     const createdUser = await user.save();
//     res.send({
//       _id: createdUser._id,
//       name: createdUser.name,
//       email: createdUser.email,
//       isAdmin: createdUser.isAdmin,
//       token: generateToken(createdUser),
//     });
//   })
// );

// adminRouter.put(
//   "/change-password",
//   isAuth,
//   expressAsyncHandler(async (req, res) => {
//     const currentPwd = req.body.currentPwd;
//     const newPwd = req.body.newPwd;
//     const user = await User.findById(req.user._id);
//     // check current password
//     if (!bcrypt.compareSync(currentPwd, user.password))
//       return res
//         .status(401)
//         .send({ message: "Current password doesn't match !" });

//     // New password can not be the same with current password
//     if (newPwd === currentPwd)
//       return res
//         .status(401)
//         .send({
//           message: "New password must be different from current password!",
//         });

//     // find and update password
//     const updatedUser = await User.findByIdAndUpdate(req.user._id, {
//       password: bcrypt.hashSync(newPwd, 8),
//     });

//     res.send({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser),
//     });
//   })
// );

module.exports = adminRouter;
