const mongoose = require("mongoose");

const brandSchema = mongoose.Schema({

  imageUrl: { type: String, required: true },

  name: { type: String, required: true },
  numReviews: Number,
  Rating: String,
  RealPrice: Number,
  SalePrice: Number,
  
});

const BrandModel = mongoose.model("brand", brandSchema);

module.exports = { BrandModel };
