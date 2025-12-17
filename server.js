const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://admirable-beignet-11c47a.netlify.app",
    ],
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.use("/api", require("./routes/taskRoutes"));

app.get("/", (req, res) => {
  res.send("Task Manager API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
