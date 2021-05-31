const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const {
  isAuth,
  isAdmin,
  generateProductArr,
  updateProductSaleoff,
} = require("../utils");
const Product = require("../models/productModel");
const Saleoff = require("../models/saleoffModel");

const saleoffRouter = express.Router();

// Get sale off list
saleoffRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const saleoffs = await Saleoff.find().populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      res.status(200).send(saleoffs);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// Add sale off
saleoffRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const { name, method, discount, applyFor, applyForValue, applyNumber } =
      req.body;
    // Case: applyFor == "product"
    if (applyFor === "product") {
      const product = await Product.findById(applyForValue);
      const newSaleoff = new Saleoff({
        name,
        method,
        discount,
        applyFor,
        applyForValue,
        products: [
          {
            product: applyForValue,
            applyNumber,
          },
        ],
      });
      const createdSaleoff = await newSaleoff.save();
      product.saleoff = product.price - (product.price * discount) / 100;
      product.type = "On Sale";
      await product.save();
      res.status(200).send(createdSaleoff);
    }

    // Case: applyFor == "brand" || applyFor == "category"
    if (applyFor !== "product") {
      const query =
        applyFor === "brand"
          ? { brand: applyForValue }
          : applyFor === "category"
          ? { category: applyForValue }
          : "";
      const products = await Product.find(query);
      const newSaleoff = new Saleoff({
        name,
        method,
        discount,
        applyFor,
        applyForValue,
        products: generateProductArr(products, applyNumber),
      });
      const createdSaleoff = await newSaleoff.save();
      await updateProductSaleoff(products, method, discount);
      res.send(createdSaleoff);
    }
  })
);

// Remove saleoff
saleoffRouter.delete(
  "/:saleoffId",
  expressAsyncHandler(async (req, res) => {
    const saleoff = await Saleoff.findById(req.params.saleoffId);
    saleoff.products.forEach(async (item) => {
      const pro = await Product.findById(item.product);
      pro.saleoff = 0;
      pro.type = "Featured Product";
      await pro.save();
    });
    try {
      const removedPro = await Saleoff.findByIdAndDelete(req.params.saleoffId);
      res.status(200).send(removedPro);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

// Get specific saleoff
saleoffRouter.get(
  "/:saleoffId",
  expressAsyncHandler(async (req, res) => {
    try {
      const saleoff = await Saleoff.findById(req.params.saleoffId).populate({
        path: "products",
        populate: {
          path: "product",
          model: "Product",
        },
      });
      res.send(saleoff);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

module.exports = saleoffRouter;
