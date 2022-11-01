const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema({
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
  message: { type: String },
  rating: { type: Number },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
