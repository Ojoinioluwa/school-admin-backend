require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");
const adminRouter = require('./routes/adminRoutes/AdminRoute');
const studentsRouter = require('./routes/studentsRoutes/StudentRoute');
const teacherRouter = require('./routes/teachersRoutes/TeacherRoute');
const cors = require("cors");
const schoolCalenderRouter = require('./routes/SchoolCalender/schoolCalenderRoute');
const deptRouter = require('./routes/deptRoutes/deptRoute');
const levelRouter = require('./routes/LevelRoutes/levelRoute'); 
const attendanceRouter = require('./routes/attendanceRoutes/attendanceRoute');

// TODO: make use of   .exec() in all files to follow best practice

const app = express()
const PORT = 8080


mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log("Database connected succesfully"))
    .catch((err)=> console.log(err))

const corsOption = {
    origin: ["http://localhost:5173"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
}

app.use(cors(corsOption))

   // make use of all middlewares here
   app.use(express.json());

   app.use("/", adminRouter)
   app.use("/", schoolCalenderRouter)
   app.use("/", deptRouter)
   app.use("/", levelRouter)
   app.use("/", studentsRouter)
   app.use("/", teacherRouter)
   app.use("/", attendanceRouter)





    // consuming the error handler middleware
    app.use(errorHandler)



app.listen(PORT, ()=> console.log(`App is running on port ${PORT}`))