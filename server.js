
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/Student");

const create = require("./crud/create");
const read = require("./crud/read");

const app = express();
app.use(express.json());

// Connect MongoDB
connectDB();

// Helper function
function demo(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req);
      res.status(200).json({
        ok: true,
        result: result
      });
    } catch (err) {
      res.status(500).json({
        ok: false,
        error: err.message
      });
    }
  };
}

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Student CRUD demo is running"
  });
});

// Reset route
app.get("/demo/reset", demo(async () => {
  const result = await Student.deleteMany({});
  return { deletedCount: result.deletedCount };
}));

// CREATE routes (Step 6)
app.get("/demo/create/save",
  demo(() => create.createWithSave()));

app.get("/demo/create/shorthand",
  demo(() => create.createWithCreate()));

app.get("/demo/create/many",
  demo(() => create.createMany()));

app.get("/demo/create/invalid",
  demo(() => create.createInvalid()));

// READ routes (Step 7)
app.get("/demo/read/all",
  demo(() => read.readAll()));

app.get("/demo/read/passed",
  demo(() => read.readPassed()));

app.get("/demo/read/top",
  demo(() => read.readTopStudents()));

app.get("/demo/read/by-id/:id",
  demo((req) => read.readById(req.params.id)));

app.get("/demo/read/by-email/:email",
  demo((req) => read.readByEmail(req.params.email)));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: `Route ${req.originalUrl} not found`
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
