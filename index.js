
const express = require("express");
require("dotenv").config();
const cors = require("cors");
require("express-async-errors");
const bodyParser = require("body-parser");
const { connection } = require("./config/database");
const { productRouter } = require("./Routes/Product.route");
const { brandRouter } = require("./Routes/Brand.route");
const UserRouter = require("./Routes/User.route")
const CartRouter = require("./Routes/Cart.route")
// const { userRouter } = require("./Routes/user.route");

const router = require("./Routes/Admin.route");
const PORT = process.env.PORT
const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .send({ message: "welcome to trendy vibes testing Homepage API" });
});

// app.use("/user", userRouter);
// app.use(Auth);



app.use("/product", productRouter);
app.use("/brand", brandRouter);
app.use("/User" , UserRouter)
app.use("/cart", CartRouter)

app.use(bodyParser.json());
app.use("/admin", router);

// app.use("/user", userRouter);
// app.use(Auth);



app.listen( PORT, async () => {
  try {
    await connection;
    console.log("db is connected successfully");
  } catch (err) {
    console.log("db is connected successfully");
    console.log(err);
  }

  console.log(`Server is listning on 8080`);
});