const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Rating = require("./models/ratingModel");
const Product = require("./models/productModel");
const nodemailer = require("nodemailer");

// Calculating cart total
const cartTotal = (cartItems) => {
  let total = cartItems.reduce((a, item) => a + item.price * item.qty, 0);
  return total.toFixed(2);
};
// Generate email content table
exports.generateTable = (cartItems) => {
  let message =
    '<table style="border: 1px solid #333;">' +
    "<thead>" +
    "<tr>" +
    "<th> Product </th>" +
    "<th> Quantity </th>" +
    "<th> Price </th>" +
    "<th> Subtotal </th>" +
    "</tr>" +
    "</thead>";

  cartItems.forEach((item) => {
    message +=
      "<tr>" +
      "<td>" +
      item.name +
      "</td>" +
      "<td>" +
      item.qty +
      "</td>" +
      "<td>$" +
      item.price +
      "</td>" +
      "<td>$" +
      (item.price * item.qty).toFixed(2) +
      "</td>" +
      "</tr>";
  });

  message += "</table>";
  message += "<h4>Shipping: free</h4>";
  message += "<h4>Cart total: $" + cartTotal(cartItems) + "</h4>";
  return message;
};

// Send mail
exports.sendMail = (email, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      pass: process.env.WORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN,
    },
  });
  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: subject,
    html: html,
  };
  transporter.sendMail(mailOptions);
};

exports.generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.SECRET_KEY || "mytopsecret",
    {
      expiresIn: "30d",
    }
  );
};

exports.validateSigninRequest = [
  check("email").notEmpty().withMessage("Email field can not be empty"),
  check("password").notEmpty().withMessage("Password field can not be empty"),
];

exports.isSigninRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.status(400).send({ error: errors.array()[0].msg });
  }
  next();
};

exports.isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ message: "There's no token" });
    return;
  }

  const token = authorization.split(" ")[1];

  // Get user info through token
  jwt.verify(token, process.env.SECRET_KEY || "mytopsecret", (err, decode) => {
    if (err) {
      res.status(401).send({ message: "Invalid token" });
      return;
    }
    req.user = decode;
    next();
  });
};

exports.isAdmin = (req, res, next) => {
  if (!req.user.isAdmin)
    return res
      .status(401)
      .send({ message: "Access denied! Only admin can access this resource!" });
  next();
};

exports.updateProductRating = async (createdRating) => {
  const ratings = await Rating.find({ product: createdRating.product });
  const totalRatingPoint = ratings.reduce((a, c) => a + c.point, 0);
  const avgPoint = totalRatingPoint / ratings.length;

  const product = await Product.findById(createdRating.product);
  product.numReviews = ratings.length;
  product.rating = avgPoint;
  await product.save();
};

// mailContent, req.body.email, subject, text,
const { mails } = require("./data");

exports.checkMailType = (req, res, next) => {
  const { type } = req.query;
  const mailObj = mails.find((item) => item.type === type);
  if (mailObj) {
    req.mailObj = mailObj;
    next();
  } else {
    next();
  }
};
