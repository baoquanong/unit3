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

// new job
router.post("/new", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    if (job) {
      res.status(201).json(job)
    } else {
      res.status(400).json({ error: "Unable to create new job" });
    }
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

module.exports = router;
