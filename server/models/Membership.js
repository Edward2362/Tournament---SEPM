const mongoose = require("mongoose");

const MembershipSchema = mongoose.Schema(
  {
    overallPoint: {
      type: Number,
      default: 0,
    },
    desiredReward: {
      type: String,
      maxlength: [100, "Cannot be longer than 100 characters"],
      default: "",
    },
    upperBoundary: {
      type: Number,
      default: 0,
    },
    lowerBoundary: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: ["admin", "member"],
      default: "member",
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

module.exports = mongoose.model("Membership", MembershipSchema);
