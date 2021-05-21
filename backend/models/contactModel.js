const mongoose = require("mongoose");

const contactSheme = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
});

const Contact = mongoose.model("Contact", contactSheme);

module.exports = Contact;
