const express = require("express");
const { isAuth, isAdmin, updateProductRating } = require("../utils");
const expressAsyncHandler = require("express-async-handler");
const Rating = require("../models/ratingModel");
const User = require("../models/userModel");

const ratingRouter = express.Router();

//================================== ADMIN ==================================
//=== Get rating list
ratingRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // TODO
  })
);

//=== Delete specific rating
ratingRouter.delete(
  "/:ratingId",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    // TODO
  })
);

//================================== USER ==================================
//=== Post rating
ratingRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const newRating = new Rating({
        order: req.body.order,
        product: req.body.product,
        comment: req.body.comment,
        point: req.body.point,
        createdAt: req.body.createdAt,
      });
      const createdRating = await newRating.save();

      // Update product: [rating, numReviews] fields
      updateProductRating(createdRating);

      res.status(200).send(createdRating);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

//=== Get specific rating based on orderId
ratingRouter.get(
  "/:orderId",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    try {
      const ratings = await Rating.find({ order: req.params.orderId });
      res.status(200).send(ratings);
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
);

//=== Get list of comments on specific product based on ProductId
ratingRouter.get(
  "/comments/:productId",
  expressAsyncHandler((req, res) => {
    Rating.find({ product: req.params.productId })
      .populate({
        path: "order",
        populate: {
          path: "user",
          model: "User",
        },
      })
      .exec((err, data) => {
        if (err) {
          return res.status(500).send(err.message);
        }
        // else
        res.status(200).send(data);
      });
  })
);

module.exports = ratingRouter;
