
require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/Student");

// CRUD files (one file per operation)
const create = require("./crud/create");
const read = require("./crud/read");
const update = require("./crud/update");
const remove = require("./crud/delete"); // "delete" is a reserved word, so we call it "remove"

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

app.get("/demo/create/duplicate-email",
  demo(() => create.createDuplicateEmail()));

app.get("/demo/create/negative-marks",
  demo(() => create.createNegativeMarks()));

// READ routes (Step 7)
app.get("/demo/read/all",
  demo(() => read.readAll()));

app.get("/demo/read/passed",
  demo(() => read.readPassed()));

app.get("/demo/read/failed",
  demo(() => read.readFailed()));

app.get("/demo/read/top",
  demo(() => read.readTopStudents()));

app.get("/demo/read/by-course/:course",
  demo((req) => read.readByCourse(req.params.course)));

app.get("/demo/read/by-id/:id",
  demo((req) => read.readById(req.params.id)));

app.get("/demo/read/by-email/:email",
  demo((req) => read.readByEmail(req.params.email)));

// UPDATE routes (Step 8)
app.get("/demo/update/without-new/:id",
  demo((req) => update.updateWithoutNew(req.params.id)));

app.get("/demo/update/with-new/:id",
  demo((req) => update.updateWithNew(req.params.id)));

app.get("/demo/update/by-email/:email",
  demo((req) => update.updateByEmail(req.params.email)));

app.get("/demo/update/many",
  demo(() => update.updateManyHighScorers()));

app.get("/demo/update/marks/:email",
  demo((req) => update.updateMarks(req.params.email, req.query.marks)));

// DELETE routes (Step 9)
app.get("/demo/delete/by-id/:id",
  demo((req) => remove.deleteById(req.params.id)));

app.get("/demo/delete/by-email/:email",
  demo((req) => remove.deleteByEmail(req.params.email)));

app.get("/demo/delete/inactive",
  demo(() => remove.deleteInactive()));

app.get("/demo/delete/below/:limit",
  demo((req) => remove.deleteBelow(req.params.limit)));

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
