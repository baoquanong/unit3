const express = require("express");
const Job = require("../models/Job");
const seedJobs = require("../seed data/seedJobs");

const router = express.Router();

// ROUTES
router.get("/seed", async (req, res) => {
  await Job.deleteMany();
  const jobs = await Job.insertMany(seedJobs);

  res.json(jobs);
});

module.exports = router;
