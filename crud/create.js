// crud/create.js -- CREATE operations (the "C" in CRUD)
const Student = require("../models/Student");

// Way 1: build the document in memory with "new", then save it
async function createWithSave() {
  const newStudent = new Student({
    name: "Alice Rahman",
    email: "alice@example.com",
    marks: 85,
    enrolledCourses: ["SWE301", "SWE302"]
  });
  const saved = await newStudent.save();
  return saved;
}

// Way 2: shorthand. Student.create() does new + save() in one step
async function createWithCreate() {
  const student = await Student.create({
    name: "Rahim Uddin",
    email: "rahim@example.com",
    marks: 72
  });
  return student;
}

// Way 3 (bonus): insert several documents with one call
async function createMany() {
  const students = await Student.insertMany([
    { name: "Karim Hasan", email: "karim@example.com", marks: 91 },
    { name: "Tania Akter", email: "tania@example.com", marks: 45 }
  ]);
  return students;
}

// Way 4: what happens when validation fails? ("marks" is missing)
async function createInvalid() {
  try {
    await Student.create({ name: "No Marks", email: "x@example.com" });
    return { failed: false };
  } catch (err) {
    return { failed: true, message: err.message };
  }
}

module.exports = {
  createWithSave,
  createWithCreate,
  createMany,
  createInvalid
};
