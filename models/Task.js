const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // gives createdAt automatically
  }
);

module.exports = mongoose.model("Task", taskSchema);
