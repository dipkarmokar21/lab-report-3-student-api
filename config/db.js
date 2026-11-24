const dns = require("node:dns");
const mongoose = require("mongoose");

async function connectDB() {
  try {
    if (process.env.MONGO_DNS_SERVERS) {
      dns.setServers(process.env.MONGO_DNS_SERVERS.split(",").map(server => server.trim()));
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}

module.exports = connectDB;
