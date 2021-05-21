const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const data = require("../data");
const { isAdmin, isAuth } = require("../utils");
const slugify = require("slugify");
const multer = require("multer");
const fs = require("fs");
const { promisify } = require("util");
const unlinkAsync = promisify(fs.unlink);

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`);
  },
});

const upload = multer({ storage });

//================================ ADMIN ==========================

//=== Admin list product
productRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//=== AMIN ADD PRODUCT
productRouter.post(
  "/add",
  isAuth,
  isAdmin,
  upload.single("image"),
  expressAsyncHandler(async (req, res) => {
    const { name, category, price, brand, countInStock, description, type } =
      req.body;

    const size = JSON.parse(req.body.size);
    const color = JSON.parse(req.body.color);

    const newProduct = new Product({
      name,
      slug: slugify(name, { lower: true }),
      category,
      image: req.file.filename,
      price,
      brand,
      rating: 0,
      countInStock,
      numReviews: 0,
      description,
      size,
      color,
      type,
    });

    try {
      const createdProduct = await newProduct.save();
      res.status(200).send(createdProduct);
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
      await unlinkAsync(req.file.path);
    }
  })
);

//=== ADMIN EDIT PRODUCT
productRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  upload.single("image"),
  expressAsyncHandler(async (req, res) => {
    // File chosen => req.file => exist
    // No file chosen => req.file = "" (undefined)

    const { name, category, price, brand, countInStock, description, type } =
      req.body;

    const size = JSON.parse(req.body.size);
    const color = JSON.parse(req.body.color);

    try {
      const product = await Product.findById(req.params.id);

      // Return error message when there is no info to change
      if (product) {
        if (
          name === product.name &&
          category === product.category &&
          JSON.parse(price) === product.price &&
          brand === product.brand &&
          JSON.parse(countInStock) === product.countInStock &&
          description === product.description &&
          type === product.type &&
          JSON.stringify(size) === JSON.stringify(product.size) &&
          JSON.stringify(color) === JSON.stringify(product.color) &&
          !req.file
        ) {
          return res.status(404).send({ message: "There is no change !" });
        }
      } else {
        res.status(404).send({ message: "Product not found" });
      }

      if (req.file) {
        product.image = req.file.filename;
      }

      product.name = name;
      product.slug = slugify(name, { lower: true });
      product.category = category;
      product.price = price;
      product.brand = brand;
      product.countInStock = countInStock;
      product.description = description;
      product.type = type;
      product.size = size;
      product.color = color;

      const updatedProduct = await product.save();
      res.status(200).send(updatedProduct);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//== ADMIN DELETE PRODUCT
productRouter.get(
  "/delete/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId);
      res.status(200).send(deletedProduct);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//================================ /ADMIN ==========================

// List products
productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { name, category, brand, order, type, min, max, rating, page } =
      req.query;
    const filterName = name ? { name: { $regex: name, $options: "i" } } : {};
    const filterCategory = category ? { category } : {};
    const filterBrand = brand ? { brand } : {};
    filterOrder =
      order === "price" && type === "lowest"
        ? { price: 1 }
        : order === "price" && type === "highest"
        ? { price: -1 }
        : order === "view" && type === "lowest"
        ? { numReviews: 1 }
        : order === "view" && type === "highest"
        ? { numReviews: -1 }
        : order === "star" && type === "lowest"
        ? { rating: 1 }
        : order === "star" && type === "highest"
        ? { rating: -1 }
        : {};
    filterPrice =
      min && max ? { price: { $gte: Number(min), $lte: Number(max) } } : {};
    filterRating =
      Number(rating) !== 0 ? { rating: { $gte: Number(rating) } } : {};

    const pageSize = 12;
    const skip = pageSize * (page - 1);

    try {
      // Get total docs
      const productsGetDocs = await Product.find({
        ...filterName,
        ...filterCategory,
        ...filterBrand,
        ...filterPrice,
        ...filterRating,
      }).sort(filterOrder);

      // Get products by skip and limit
      const productsToSend = await Product.find({
        ...filterName,
        ...filterCategory,
        ...filterBrand,
        ...filterPrice,
        ...filterRating,
      })
        .sort(filterOrder)
        .skip(skip)
        .limit(pageSize);

      const totalPages = Math.ceil(productsGetDocs.length / pageSize);
      let totalPagesArr = [];
      for (let i = 0; i < totalPages; i++) {
        totalPagesArr.push(i + 1);
      }
      const dataToSend = {
        totalPages: totalPagesArr,
        products: productsToSend,
      };

      res.status(200).send(dataToSend);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//=== GET CATEGORY LIST
productRouter.get(
  "/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

//=== GET BRAND LIST
productRouter.get(
  "/brands",
  expressAsyncHandler(async (req, res) => {
    const brands = await Product.find().distinct("brand");
    res.send(brands);
  })
);

//=== GET TYPE LIST
productRouter.get(
  "/types",
  expressAsyncHandler(async (req, res) => {
    const types = await Product.find().distinct("type");
    res.send(types);
  })
);

//=== SEED DATA
productRouter.get(
  "/seed",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const createdProducts = await Product.insertMany(data.products);
    res.send(createdProducts);
  })
);

//=== GET PRODUCT DETAILS
productRouter.get(
  "/:slug",
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) return res.status(404).send({ message: "Product Not Found" });
    res.send(product);
  })
);

module.exports = productRouter;
