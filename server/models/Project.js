const mongoose = require("mongoose");
const dayjs = require("dayjs");

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
    // ! redesign in membership
    lastAccessed: {
      type: Date,
      default: dayjs().toDate(),
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

ProjectSchema.pre("remove", async function () {
  await this.model("Membership").deleteMany({ project: this._id });
});

module.exports = mongoose.model("Project", ProjectSchema);
