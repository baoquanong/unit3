// DEPENDANCIES
const express = require("express");
const Job = require("../models/Job");
const seedJobs = require("../seed data/seedJobs");

const router = express.Router();


// ROUTES
// seed route
router.get("/seed", async (req, res) => {
  await Job.deleteMany();
  const jobs = await Job.insertMany(seedJobs);

  res.json(jobs);
});

// create a new job listing
router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    if (job) {
      res.status(201).json(job);
    } else {
      res.status(400).json({ error: "Unable to create new job" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate(["postedBy", "applicants", "acceptedBy"])
      .exec();
    if (jobs.length === 0) {
      res.status(400).json({ error: "No jobs found" })
    } else {
      res.status(200).json(jobs);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// get jobs applied for by a user
router.get("/applied/:user", async (req, res) => {
  console.log("req.params:", req.params.filter);
  const { user } = req.params;

  try {
    const jobs = await Job.find({ applicants: user }).populate(["acceptedBy", "applicants", "postedBy"]).exec();
    if (jobs.length === 0) {
      res.status(400).json({ error: "No jobs found" });
    } else {
      res.status(200).json(jobs);
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
    const jobs = await Job.find({ postedBy: user }).populate(["acceptedBy", "applicants"]).exec();
    if (jobs.length === 0) {
      res.status(400).json({ error: "No jobs found" });
    } else {
      res.status(200).json(jobs);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// delete a job
router.delete("/delete/:job", async (req, res) => {
  try {
    const job = await Job.findByIdAndRemove(req.params.job).exec();
    if (job.length === 0) {
      res.status(400).json({ error: "No job found with this ID" });
    } else {
      res.status(200).json(job);
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// update a job - apply
router.put("/apply/:id", async (req, res) => {
  console.log("req.body:", req.body);

  try {
    const job = await Job.findById(req.params.id).exec();
    if (job.applicants.includes(req.body._id)) {
      res.status(400).json({ error: "Already applied for this job"});
    } else {
      const applyJob = await Job.findByIdAndUpdate(
        req.params.id,
        { $push: { applicants: req.body._id } },
        { new: true }
      ).exec();
      res.status(200).json(applyJob);
    }
  } catch (error) {
    console.log(error);
  }
});

// EXPORT
module.exports = router;