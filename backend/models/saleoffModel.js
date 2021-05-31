const mongoose = require("mongoose");

const saleoffSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    method: { type: String, required: true },
    discount: { type: Number, required: true },
    applyFor: { type: String, required: true },
    applyForValue: { type: String, required: true },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        applyNumber: { type: Number, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Saleoff = mongoose.model("Saleoff", saleoffSchema);

module.exports = Saleoff;
