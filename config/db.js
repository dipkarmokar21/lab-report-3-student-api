const dns = require("dns");
const mongoose = require("mongoose");

// Force public DNS for SRV lookups when local/ISP DNS refuses _mongodb._tcp queries
dns.setServers(["8.8.8.8", "1.1.1.1"]);

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // stop the app, it cannot run without a database
  }
}

module.exports = connectDB;
