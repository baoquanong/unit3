const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: false,
    },
    applicants: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: []
    },
    acceptedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      // required: true,
    },
    jobTitle: { type: String },
    jobDescription: { type: String },
    jobType: { type: String, required: true },
    jobStatus: { type: String, required: true, default: "open" },
    jobPrice: { type: Number },
    jobLocation: { type: String },
    jobStart: { type: Date },
    jobEnd: { type: Date },
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
