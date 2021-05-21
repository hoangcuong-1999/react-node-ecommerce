const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const Rating = require("./models/ratingModel");
const Product = require("./models/productModel");

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
