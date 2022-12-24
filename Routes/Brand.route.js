const express = require("express");
const { BrandModel } = require("../Models/Brand.model");
const brandRouter = express.Router();

//Get all product
brandRouter.get("/", async (req, res) => {
  const product = await BrandModel.find();
  res.send(product);
});

//Add new product
brandRouter.post("/createproduct", async (req, res) => {
  const payload = req.body;
  try {
    const n_product = new BrandModel(payload);
    await n_product.save();
    res.send({ msg: "Product created successfully" });
  } catch (err) {
    res.send(400).json({ msg: "Something went wrong" });
  }
});

brandRouter.get("/:id", async (req, res) => {
  try{
    console.log(req.params);
    const id = req.params.id;
    const brand = await BrandModel.find({"_id":id});
    res.send(brand);
  }
  catch(er){
    res.status(400).json({ message: error.message });
  }
  
});

//Update product
brandRouter.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await BrandModel.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//Delete product
brandRouter.delete("/delete/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    await BrandModel.findByIdAndDelete({ _id: productID });
    res.send({ msg: "Product deleted successfully" });
  } catch (err) {
    res.send(400).send({ msg: "Something Went Wrong" });
  }
});

module.exports = { brandRouter };
