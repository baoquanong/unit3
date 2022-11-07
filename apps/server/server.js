// DEPENDANCIES
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
// const { appendFile } = require("fs");

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
app.set("trust proxy", 1); // trust first proxy
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    // cookie: { secure: true }
  })
);

app.use(express.static("../client/dist")); // deploying front and back end - this gives express access to load react

app.use(express.json());
app.use("/api/jobs", JobController);
app.use("/api/reviews", ReviewController);
app.use("/api/users", UserController);

// ROUTES
// test route
app.get("/", (req, res) => {
  res.json({ msg: "hello world" });
});

// logout
app.delete("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.status(400).json({ error: "Unable to log out"});
      } else {
        res.json({ msg: "Log out successful" });
      }
    });
  } else {
    res.end();
  }
});

// CONNECT TO FRONT END ROUTING
app.get("/*", (req, res) => {
  res.sendFile(path.resolve("../client/dist/index.html"));
});

// CONNECT TO MONGO & LISTEN
mongoose.connection.on("connected", (req, res) => {
  console.log("connected to mongodb");

  app.listen(port, () => {
    console.log("currently listening on port", port);
  });
});
