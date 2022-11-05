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

router.post("/", async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
    console.log(error);
  }
});



module.exports = router;
