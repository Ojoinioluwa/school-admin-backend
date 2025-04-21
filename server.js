require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");

const app = express()
const PORT = 8080
const URI = "mongodb+srv://ojoinioluwa05:owobCi68qHHWKbQG@oay.vupnvf7.mongodb.net/schooolAdmin"

mongoose.connect(URI)
    .then(()=> console.log("Database connected succesfully"))
    .catch((err)=> console.log(err))



   // make use of all middlewares here
   app.use(express.json());





    // consuming the error handler middleware
    app.use(errorHandler)



app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))