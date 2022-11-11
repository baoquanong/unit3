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
  if ("userID" in req.session) {
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
  } else {
    res.status(500).json({ error: "No user logged in"})
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

  if ("userID" in req.session) {
    try {
      const jobs = await Job.find({ applicants: user })
        .populate(["acceptedBy", "applicants", "postedBy"])
        .exec();
      if (jobs.length === 0) {
        res.status(400).json({ error: "No jobs found" });
      } else {
        res.status(200).json(jobs);
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    
  }
});

// get jobs posted by a user
router.get("/posted/:user", async (req, res) => {
  const { user } = req.params;

  if ("userID" in req.session) {
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
  } else {
    res.status(500).json({ error: "No user logged in"})
  }

});

// delete a job
router.delete("/delete/:job", async (req, res) => {
  if ("userID" in req.session) {
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
  } else {
    res.status(500).json({ error: "No user logged in"})
  }

});

// update a job - apply
router.put("/apply/:id", async (req, res) => {
  console.log("req.body:", req.body);

  if ("userID" in req.session) {
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
  } else {
    res.status(500).json({ error: "No user logged in" });
  }

});

// update a job - edit
router.put("/edit/:job", async (req, res) => {
  if ("userID" in req.session) {
    try {
      const editJob = await Job.findByIdAndUpdate(
        req.params.job,
        req.body,
        { new: true }
      );
      if (editJob.length === 0) {
        res.status(400).json({ error: "Unable to find job to update" });
      } else {
        res.status(200).json(editJob);
      }
    }
    catch (error) {
      res.status(500).json();
    }
  } else {
    res.status(500).json({ error: "No user logged in"});
  }
});

// update a job - accept
router.put("/accept/:job", async (req, res) => {
  if ("userID" in req.session) {
    try {
      const acceptJob = await Job.findByIdAndUpdate(
        req.params.job,
        req.body,
        { new :true }
      );
      if (acceptJob.length === 0) {
        res.status(400).json({ error: "Unable to accept user" });
      } else {
        res.status(200).json({acceptJob})
      }
    }
    catch (error) {
      res.status(500).json({ error: error });
    }
  } else {
    res.status(500).json({ error: "No user logged in"});
  }
});

// EXPORT
module.exports = router;