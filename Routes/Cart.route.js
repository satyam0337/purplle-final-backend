const express = require("express") ;
const Cart = require("../Models/Cart.model") ;

const app = express.Router() ;

app.get("/", async(req, res)=>{
  try{
      let output = await Cart.find();
      res.send(output);
 }
 catch(err){
     res.status(500).send(err);
 }
})


app.get("/:userId", async(req, res)=>{
    try{
        const { userId } = req.params
        console.log(userId);
        let output = await Cart.find({"user": userId}).populate(["product"]);
        res.send(output);
   }
   catch(err){
       res.status(500).send(err);
   }
})


app.post("/", async(req, res)=>{
//   console.log(req.headers.authorization)
    try{
        const { userId,productId, quantity } = req.body
        var existingItem = await Cart.findOne({ user:userId , product:productId}).populate(["product"]) ;
        if(existingItem){
            
          let update = await Cart.findOneAndUpdate({
            user: req.body.userId,
            product: req.body.productId
          },{
            $set: {
                quantity: quantity || 1 || existingItem.quantity
            }
          }
          ).populate(["product"]) ;
          res.send(update)
        }
       else{

            let cart = await Cart.create({user:req.body.userId , product:req.body.productId}) ;
          res.send(cart);
      
        
       }
        
   }
   catch(err){
       res.status(500).send(err.message);
   }
})

app.patch("/:id", async (req,res)=>{
  try{
      let id = req.params.id;
      let update = await Cart.updateOne({"_id":id},{$set:{ quantity : Number(req.body.quantity)}});
      res.status(200).send(update);
  }
  catch(err){
      res.status(500).send(err.message);
  }
  
})

app.delete("/:id", async(req, res)=>{
    try{
        let id = req.params.id;
        let product = await Cart.deleteOne({"_id":id})
        res.send(product);
   }
   catch(err){
       res.status(500).send(err.message);
   }
})

// app.patch("/:id", async (req,res)=>{
//     try{
//         let id = req.params.id;
//         let update = await Product.updateOne({"_id":id},{$set:{...req.body}});
//         res.status(200).send("Task Details Updated Successfully!");
//     }
//     catch(err){
//         res.status(500).send(err.message);
//     }
    
// })

module.exports =app;