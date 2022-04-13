const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: [4, "Name cannot be shorter than 4 characters"],
      maxLength: [50, "Name cannot be longer than 50 characters"],
      trim: true,
    },
    trelloBoardId: {
      type: String,
      required: [true, "Please provide the ID of your trello board"],
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProjectSchema.pre("remove", async function () {
  await this.model("Member").deleteMany({ project: this._id });
});

ProjectSchema.statics.findOneExist = async function (queryObject) {
  const project = await this.model("Project").findOne(queryObject);
  if (!project) {
    throw new NotFoundError();
  }
  return project;
};

module.exports = mongoose.model("Project", ProjectSchema);
