const express = require("express");
const Category = require("../models/categoryModel");
const expressAsyncHandler = require("express-async-handler");
const slugify = require("slugify");
const { isAuth, isAdmin } = require("../utils");

const categoryRouter = express.Router();

//==================== FOR ADMIN =====================

//=== Create category
categoryRouter.post(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, description } = req.body;

    const newCate = new Category({
      name,
      slug: slugify(name, { lower: true }),
      description,
    });

    try {
      const createdCategory = await newCate.save();
      res.status(200).send(createdCategory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

//=== /Create category

//=== List category
categoryRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /List category

//=== Details category
categoryRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    try {
      const category = await Category.findById(req.params.id);
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /Details category

//=== Delete category
categoryRouter.get(
  "/delete/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const deletedCategory = await Category.findByIdAndDelete(req.params.id);
      res.send(deletedCategory);
      res.status(200).send(deletedCategory);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);
//=== /Delete category

//=== Edit category
categoryRouter.put(
  "/edit/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { name, description } = req.body;
    try {
      const category = await Category.findById(req.params.id);

      if (category.name === name && category.description === description)
        return res.status(404).send({ message: "There is no change" });

      category.name = name;
      category.slug = slugify(name, { lower: true });
      category.description = description;
      const editedCategory = await category.save();
      res.status(200).send(editedCategory);
    } catch (error) {
      res.status(500).send({ messag: error.message });
    }
  })
);
//=== /Edit category

module.exports = categoryRouter;
