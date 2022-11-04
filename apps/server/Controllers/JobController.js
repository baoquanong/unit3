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

// get jobs posted by a user
router.get("/posted/:user", async (req, res) => {
  const { user } = req.params;

  try {
    const jobs = await Job.find({ postedBy: user }).populate("acceptedBy").exec();
    if (jobs.length === 0) {
      res.status(400).json({ error: "No jobs posted by this user" });
    } else {
      res.status(200).json(jobs);
    }
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
});

// update a job
router.put()

// delete a job
router.delete("/:job", async (req, res) => {
  const { job } = req.params;
  try {
    const job = await Job.findOneAndDelete({ _id: job }).exec();
    if (job.length === 0) {
      res.status(400).json({ error: "No job found with this ID" });
    } else {
      res.status(200).json(job);
    }
  }
  catch (error) {
    res.status(500).json({ error: error });
  }
})

module.exports = router;
