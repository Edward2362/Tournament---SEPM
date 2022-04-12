const mongoose = require("mongoose");
const { BadRequestError } = require("../errors");

const MemberSchema = mongoose.Schema(
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

MemberSchema.pre("save", async function () {
  // check for joining same project with same user multiple times
  const isAlreadyMember = await this.model("Member").findOne({
    project: this.project,
    user: this.user,
  });
  if (isAlreadyMember) {
    throw new BadRequestError("User already in project");
  }
});

// TODO: pre .remove

module.exports = mongoose.model("Member", MemberSchema);
