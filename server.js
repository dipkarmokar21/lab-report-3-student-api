require("dotenv").config({ quiet: true });
const express = require("express");
const connectDB = require("./config/db");
const Student = require("./models/Student");



const app = express();
app.use(express.json());

connectDB();

function demo(handler) {
  return async (req, res) => {
    try {
      const result = await handler(req);
      res.status(200).json({ ok: true, result });
    } catch (err) {
      res.status(500).json({ ok: false, error: err.message });
    }
  };
}

app.get("/", (req, res) => {
  res.json({ message: "Student CRUD demo is running" });
});


app.get("/demo/reset", demo(async () => {
  const result = await Student.deleteMany({});
  return { deletedCount: result.deletedCount };
}));

app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

const PORT = Number(process.env.PORT || 3000);

app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
