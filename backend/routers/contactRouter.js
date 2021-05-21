// Routers for contact api
const express = require("express");
const contactRouter = express.Router();
const expressAsyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const { isAuth, isAdmin } = require("../utils");

contactRouter.post(
  "/",
  expressAsyncHandler(async (req, res) => {
    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
    });
    try {
      const createdContact = await newContact.save();
      res.status(201).send(createdContact);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  })
);

contactRouter.get(
  "/",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    try {
      const contacts = await Contact.find();
      res.status(200).send(contacts);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

contactRouter.get(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contactId = req.params.id;
    try {
      const contact = await Contact.findById(contactId);
      res.status(200).send(contact);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

contactRouter.delete(
  "/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const contactId = req.params.id;
    try {
      const deletedContact = await Contact.findByIdAndDelete(contactId);
      res.status(200).send(deletedContact);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  })
);

module.exports = contactRouter;
