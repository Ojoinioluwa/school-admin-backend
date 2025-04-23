require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const adminRouter = require('./routes/adminRoutes/AdminRoute');
const studentsRouter = require('./routes/studentsRoutes/StudentRoute');
const teacherRouter = require('./routes/teachersRoutes/TeacherRoute');

const app = express()
const PORT = 8080


mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("Database connected succesfully"))
    .catch((err)=> console.log(err))



   // make use of all middlewares here
   app.use(express.json());

   app.use("/", adminRouter)
   app.use("/", studentsRouter)
   app.use("/", teacherRouter)





    // consuming the error handler middleware
    app.use(errorHandler)



app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))