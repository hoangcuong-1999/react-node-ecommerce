const express = require("express");
const Brand = require("../models/brandModel");
const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { isAuth, isAdmin } = require("../utils");

const brandRouter = express.Router();

//=== Create category
brandRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const newBrand = new Brand({
      name,
      slug: slugify(name, { lower: true }),
      description,
    });

    try {
      const createdBrand = await newBrand.save();
      res.status(200).send(createdBrand);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//=== /Create category

//=== List category
brandRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const brands = await Brand.find();
      res.status(200).send(brands);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /List category

//=== Details category
brandRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const brand = await Brand.findById(req.params.id);
      res.status(200).send(brand);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /Details category

//=== Delete category
brandRouter.get(
  "/delete/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedBrand = await Brand.findByIdAndDelete(req.params.id);
      res.status(200).send(deletedBrand);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /Delete category

//=== Edit category
brandRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    try {
      const brand = await Brand.findById(req.params.id);

      if (brand.name === name && brand.description === description)
        return res.status(404).send({ message: "There is no change" });

      brand.name = name;
      brand.slug = slugify(name, { lower: true });
      brand.description = description;
      const editedBrand = await brand.save();
      res.status(200).send(editedBrand);
    } catch (error) {
      res.status(500).send({ messag: error.message });
    }
  })
);
//=== /Edit category

module.exports = brandRouter;
