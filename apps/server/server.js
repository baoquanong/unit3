// DEPENDANCISE
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const { appendFile } = require("fs");
const JobController = require("./Controllers/JobController");
const ReviewController = require("./Controllers/ReviewController");
const UserController = require("./Controllers/UserController");

const port = process.env.PORT ?? 3000;
const app = express();

// MONGODB CONNECTION
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use("/api/jobs", JobController);
app.use("/api/reviews", ReviewController);
app.use("/api/users", UserController);

// ROUTES
// test route
app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// CONNECT TO MONGO & LISTEN
mongoose.connection.on("connected", (req, res) => {
  console.log("connected to mongodb");

  app.listen(port, () => {
    console.log("currently listening on port", port);
  });
});
