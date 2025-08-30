const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// PORT و MONGO_URI من .env
const PORT = process.env.PORT || 3400;
const MONGO_URI = process.env.MONGO_URL;

// Middleware
const corsOptions = {
  origin: ["http://localhost:5173", "https://your-frontend.vercel.app"], 
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
connectDB();

// Routes
app.use("/api/tasks", taskRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ success: false, error: err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
