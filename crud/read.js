// crud/read.js -- READ operations (the "R" in CRUD)
const Student = require("../models/Student");

// Find ALL documents in the collection
async function readAll() {
  const allStudents = await Student.find();
  return allStudents;
}

// Find with a filter: only students with marks >= 50
async function readPassed() {
  const passed = await Student.find({ marks: { $gte: 50 } });
  return passed;
}

// Find ONE document by its MongoDB _id
async function readById(id) {
  const one = await Student.findById(id);
  return one; // null if nothing matches
}

// Find ONE document that matches a condition
async function readByEmail(email) {
  const byEmail = await Student.findOne({ email: email });
  return byEmail; // null if nothing matches
}

// Sort, limit, and pick only some fields
async function readTopStudents() {
  const topFive = await Student
    .find()
    .sort({ marks: -1 })   // -1 = descending, 1 = ascending
    .limit(5)              // at most 5 results
    .select("name marks"); // only these fields (plus _id)
  return topFive;
}

// Practice task: find students with marks below 50
async function readFailed() {
  const failed = await Student.find({ marks: { $lt: 50 } });
  return failed;
}

// Practice task: find students enrolled in a given course
async function readByCourse(course) {
  const students = await Student.find({ enrolledCourses: course });
  return students;
}

module.exports = {
  readAll,
  readPassed,
  readById,
  readByEmail,
  readTopStudents,
  readFailed,
  readByCourse
};
