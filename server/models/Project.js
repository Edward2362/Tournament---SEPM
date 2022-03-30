const mongoose = require("mongoose");
const dayjs = require("dayjs");

const ProjectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: [4, "Name cannot be shorter than 4 characters"],
      maxLength: [50, "Name cannot be longer than 50 characters"],
    },
    trelloBoardId: {
      type: String,
      required: [true, "Please provide the ID of your trello board"],
    },
    // TODO: redesign in membership
    lastAccessed: {
      type: Date,
      default: dayjs().toDate(),
    },
  },
  { timestamps: true }
);

ProjectSchema.pre("remove", async function () {
  await this.model("Membership").deleteMany({ project: this._id });
});

module.exports = mongoose.model("Project", ProjectSchema);
