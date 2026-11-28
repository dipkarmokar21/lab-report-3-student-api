// crud/delete.js -- DELETE operations (the "D" in CRUD)
const Student = require("../models/Student");

// Delete ONE document by its _id
async function deleteById(id) {
  const deleted = await Student.findByIdAndDelete(id);
  return deleted; // the deleted document, or null if the id was not found
}

// Delete the first document matching a filter
async function deleteByEmail(email) {
  const deleted = await Student.findOneAndDelete({ email: email });
  return deleted;
}

// Delete MANY documents at once -- use with caution!
async function deleteInactive() {
  const result = await Student.deleteMany({ isActive: false });
  return { deletedCount: result.deletedCount };
}

// Practice task: delete all students with marks below a limit
async function deleteBelow(limit) {
  const result = await Student.deleteMany({ marks: { $lt: Number(limit) } });
  return { deletedCount: result.deletedCount };
}

module.exports = {
  deleteById,
  deleteByEmail,
  deleteInactive,
  deleteBelow
};
