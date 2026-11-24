const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  marks: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  enrolledCourses: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Student", studentSchema);
