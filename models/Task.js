const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // عنوان المهمة
    description: { type: String },           // وصف اختياري
    completed: { type: Boolean, default: false }, // حالة المهمة (منجزة أو لا)
    dueDate: { type: Date }                  // تاريخ إنجاز اختياري
  },
  { timestamps: true } // يضيف createdAt و updatedAt تلقائي
);

module.exports = mongoose.model("Task", taskSchema);
