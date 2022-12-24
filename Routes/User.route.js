const express = require("express") ;
const User = require("../Models/User.model") ;
const jwt =require("jsonwebtoken");
const app = express.Router() ;
app.use(express.json()) ;
const MAIN_KEY ="purplle"


app.post("/signup", async(req,res) => {
    const { email,password, age} =req.body ;
    const user=  await User.create(req.body);
    console.log(email, password, age);
    res.send("User created")
})

app.post("/login",async(req,res) =>{
    const {email} =req.body ;
    const user =await User.findOne( req.body) ;
    if(!user){
       return res.send({"error":"Error"} ) ;
    }
    
    
    const token = jwt.sign( 
        { id: user._id , email: user.email  } ,
        MAIN_KEY, //we have option to give expiry of token also
    );
    // const refreshtoken= jwt.sign( {id: user._id , email: user.email , age: user.age} , REFRESH_KEY ,{ expiresIn :REFRESH_EXP}) ;
    // we are generating the refresh token here
    res.send({"user":user, "token" :token});

}) 

module.exports =app;