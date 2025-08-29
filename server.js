const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT || 3400;

// ✅ Middleware
app.use(cors("*"));
app.use(express.json());

// ✅ MongoDB connection
const uri = "mongodb+srv://khaledelabyed0:kh7server@server-side.pmwb1gl.mongodb.net/todoapp?retryWrites=true&w=majority&appName=server-side";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};
connectDB();

// ✅ Routes
app.use("/api/tasks", taskRoutes);

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Error:", err.message);
  res.status(500).json({ success: false, error: err.message });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});