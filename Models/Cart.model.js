const mongoose = require("mongoose");

const cartSchema= new mongoose.Schema({
    product : { type: mongoose.Schema.Types.ObjectId , ref: "product" ,  },
    // brand : { type: mongoose.Schema.Types.ObjectId , ref: "brand" ,  },
    user : { type: mongoose.Schema.Types.ObjectId , ref: "user" , required :true  },
    quantity : { type: Number, default:1   }
})
const Cart = mongoose.model("cart",cartSchema);
module.exports = Cart ;