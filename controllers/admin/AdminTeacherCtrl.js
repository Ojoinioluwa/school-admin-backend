const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { nanoid } = require("nanoid");
const Teacher = require("../../models/teachersModels/Teacher");
const Student = require("../../models/studentsModels/Student");

const adminTeacherController = {
    filterTeachers: asyncHandler(async (req, res) => {
        const { department, gender } = req.query;

        const filters = {};

        if (department) filters.department = department;
        if (gender) filters.gender = gender;

        try {
            const teachers = await Teacher.find(filters).lean();

            if (teachers.length === 0) {
                return res.status(400).json({ message: "This field is empty" });
            }

            res.status(200).json({
                message: "Teachers fetched successfully",
                teachers
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }),
};

module.exports = adminTeacherController;
