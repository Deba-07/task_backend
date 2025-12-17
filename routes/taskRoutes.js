const express = require("express");
const {
  createTask,
  getTasks,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.post("/tasks", createTask);
router.get("/tasks", getTasks);
router.delete("/tasks/:id", deleteTask);

module.exports = router;
