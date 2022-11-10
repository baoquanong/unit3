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
    title: { type: String },
    description: { type: String },
    type: { type: String, required: true },
    status: { type: String, required: true, default: "open" },
    price: { type: Number },
    location: { type: String },
    start: { type: Date },
    end: { type: Date },
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
