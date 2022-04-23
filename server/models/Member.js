const mongoose = require("mongoose");

const {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} = require("../errors");

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

MemberSchema.statics.findUserIsAdmin = async function (userId, projectId) {
  // authorize user
  const member = await this.model("Project").findOne({
    _id: projectId,
    admin: userId,
  });
  if (!member) {
    throw new UnauthorizedError();
  }
  return member;
};

// TODO: pre .remove project.lastAccessed

MemberSchema.statics.findUserIsMember = async function (userId, projectId) {
  // authorize user
  const member = await this.model("Member").findOne({
    project: projectId,
    user: userId,
  });
  if (!member) {
    throw new NotFoundError();
  }
  return member;
};

MemberSchema.statics.findOneExist = async function (queryObject) {
  const member = await this.model("Member").findOne(queryObject);
  if (!member) {
    throw new NotFoundError();
  }
  return member;
};

module.exports = mongoose.model("Member", MemberSchema);
