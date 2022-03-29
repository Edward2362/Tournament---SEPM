const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema(
  {
    overallPoint: {
      type: Number,
      default: 0,
    },
    desiredReward: {
      type: String,
      default: "Air and happiness",
    },
    upperBoundary: {
      type: Number,
      default: 0,
    },
    lowerBoundary: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user ID"],
    },
    project: {
      type: mongoose.Types.ObjectId,
      ref: "Project",
      required: [true, "Please provide project ID"],
    },
  },
  { timestamps: true }
);

// TODO: pre .remove

module.exports = mongoose.model("Member", MemberSchema);
