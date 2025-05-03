const express = require("express")
const courseController = require("../../controllers/admin/courseCtrl")

const subjectRouter = express.Router()
// get courses for students
subjectRouter.get("/api/v1/student/listCourses", courseController.listCoursesStudent)


// get courses for teachers
subjectRouter.get("/api/v1/teacher/listCourses", courseController.listCoursesTeacher)

// get courses for admin
subjectRouter.get("/api/v1/admin/listCourses", courseController.listCourseAdmin)

// create course for admins only
subjectRouter.post("/api/v1/admin/createCourse", courseController.createCourse)

// authorize course for only admin and teacher
// edit course
subjectRouter.put("/api/v1/admin/editCourse/:courseId", courseController.editCourse)


