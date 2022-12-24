const mongoose = require("mongoose");

const productSchema = mongoose.Schema({

  imageUrl: { type: String, required: true },

  name: { type: String, required: true },
  numReviews: Number,
  Rating: String,
  RealPrice: Number,
  SalePrice: Number,
  
});

const ProductModel = mongoose.model("product", productSchema);

module.exports = { ProductModel };
