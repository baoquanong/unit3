const mongoose = require("mongoose");

const jobSchema = mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: false,
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    // required: true,
  },
  description: { type: String },
  jobType: { type: String, required: true },
  status: { type: String, required: true },
  price: { type: Number },
  location: { type: String },
  jobStart: { type: Date },
  jobEnd: { type: Date },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
