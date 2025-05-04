const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const Assignment = require('../../models/Assignment');

// TODO: make changes to the getAllAssignments function to get all assignments for a specific student

const studentsAssignmentController = {
    getAssignments: asyncHandler(async (req, res) => {
        const { SubjectId } = req.params;
        if (!SubjectId) {
            throw new Error('Need the subject to get the assignments');
        }
        const assignments = await Assignment.find({ SubjectId });
        if (assignments.length === 0) {
            throw new Error('No assignments found for this subject');
        }
        res.status(200).json({
            message: 'Assignments fetched successfully',
            assignments,
        });
    }),

    getAssignment: asyncHandler(async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        res.status(200).json({
            message: 'Assignment fetched successfully',
            assignment,
        });
    }),

    submitAssignment: asyncHandler(async (req, res) => {
        const { assignmentId } = req.params;
        if (!submissionDoc) {
            throw new Error('Submission document is required');
        }
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        // Assuming you have a field in the Assignment model to store submissions
        assignment.submissions.push({
            studentID: req.user._id,
            submissionDoc: req.file.path,
        });
        await assignment.save();
    }),
    getAllSubmissions: asyncHandler(async (req, res) => {
        const { assignmentId } = req.params;
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            throw new Error('Assignment not found');
        }
        if (assignment.submissions.length === 0) {
            throw new Error('No submissions found for this assignment');
        }
        res.status(200).json({
            message: 'Submissions fetched successfully',
            submissions: assignment.submissions,
        });
    }),
    // there is a mistake in the logic for the function below, it should be getAllAssignments for a specific student
    // but it is getting all assignments for all students, fix this in the future
   getAllAssignments: asyncHandler(async (req, res) => {
        const assignments = await Assignment.find({});
        if (assignments.length === 0) {
            throw new Error('No assignments found');
        }
        res.status(200).json({
            message: 'Assignments fetched successfully',
            assignments,
        });
    }), 
}

module.exports = studentsAssignmentController;