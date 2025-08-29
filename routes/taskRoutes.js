const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// ✅ GET all tasks
router.get("/", async (req, res, next) => {
  try {
    const tasks = await Task.find();
    res.status(200).json({ success: true, data: tasks });
  } catch (err) {
    next(err);
  }
});

// ✅ POST add new task
router.post("/", async (req, res, next) => {
  try {
    const newTask = await Task.create(req.body);
    res.status(201).json({ success: true, data: newTask });
  } catch (err) {
    next(err);
  }
});

// ✅ PUT update task by id
router.put("/:id", async (req, res, next) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, data: updatedTask });
  } catch (err) {
    next(err);
  }
});

// ✅ DELETE task by id
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    res.status(200).json({ success: true, message: "Task deleted", data: deletedTask });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
