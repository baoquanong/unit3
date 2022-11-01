// DEPENDANCISE
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const cors = require("cors");
const session = require("express-session");


const port = process.env.PORT ?? 3000;
const app = express();

// MONGODB CONNECTION
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI);

// MIDDLEWARE
app.use(cors());
app.use(express.json());

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
