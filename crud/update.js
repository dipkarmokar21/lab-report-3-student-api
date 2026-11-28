// crud/update.js -- UPDATE operations (the "U" in CRUD)
const Student = require("../models/Student");

// WITHOUT { new: true }: the function returns the OLD document
async function updateWithoutNew(id) {
  const oldDoc = await Student.findByIdAndUpdate(id, { marks: 88 });
  return oldDoc;
}

// WITH { new: true }: the function returns the UPDATED document
async function updateWithNew(id) {
  const updated = await Student.findByIdAndUpdate(
    id,
    { marks: 90 },
    { new: true, runValidators: true }
  );
  return updated;
}

// Update the first document that matches a filter
async function updateByEmail(email) {
  const updated = await Student.findOneAndUpdate(
    { email: email },
    { $set: { isActive: false } },
    { new: true }
  );
  return updated;
}

// Update MANY documents at once
async function updateManyHighScorers() {
  const result = await Student.updateMany(
    { marks: { $gte: 90 } },
    { $set: { isActive: true } }
  );
  return result; // a summary (how many matched / modified), not the documents
}

// Practice task: update marks by email using query string (?marks=95)
async function updateMarks(email, marks) {
  const updated = await Student.findOneAndUpdate(
    { email: email },
    { $set: { marks: Number(marks) } },
    { new: true, runValidators: true }
  );
  return updated;
}

module.exports = {
  updateWithoutNew,
  updateWithNew,
  updateByEmail,
  updateManyHighScorers,
  updateMarks
};
