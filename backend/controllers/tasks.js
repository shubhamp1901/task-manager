const asyncHandler = require("express-async-handler");
const { Task } = require("../models/tasks");

const getAllTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({user_id: req.user.id});
  res.status(200).json({ success: true, data: tasks });
});

const createTask = asyncHandler(async (req, res) => {
  const { name, completed } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please fill the task field");
  }

  const task = await Task.create({ name, completed, user_id: req.user.id });
  res.status(201).json({
    success: true,
    message: "Successfully add a new task",
    data: task,
  });
});

const getTask = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params;

  const task = await Task.findOne({ _id: taskId });

  if (!task) {
    res.status(404);
    throw new Error("No Task Found");
  }

  res.status(200).json({ success: true, data: task });
});

const updateTask = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    res.status(404);
    throw new Error("No Task Found");
  }
  res.status(200).json({
    success: true,
    message: "Successfully updated the task",
    data: task,
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  const { id: taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });

  if (!task) {
    res.status(404);
    throw new Error("No Task Found");
  }

  res.status(200).json({
    success: true,
    message: "Successfully deleted the task",
  });
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
