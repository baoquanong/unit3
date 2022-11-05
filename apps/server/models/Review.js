const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  postedFor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job"
  },
  message: { type: String },
  rating: { type: Number },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
