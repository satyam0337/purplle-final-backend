const mongoose = require("mongoose");
require("dotenv").config();

const connection = mongoose.connect(process.env.DATA);

module.exports = { connection };
