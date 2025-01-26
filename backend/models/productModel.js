const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  productName: { type: String, trim: true },
  brandName: { type: String, trim: true },
  productCategory: { type: String, trim: true }, // Renamed to productCategory
  productImage: { type: [String], default: [] }, // Explicitly set type as array of strings
  description: { type: String, trim: true },
  price: { type: Number, required: true },
  sellingPrice: { type: Number, required: true }
}, {
  timestamps: true
});

const productModel = mongoose.model("product", productSchema);

module.exports = productModel;