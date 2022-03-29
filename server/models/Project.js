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
    lastAccessed: {
      type: Date,
      default: dayjs().toDate(),
    },
  },
  { timestamps: true }
);

// TODO: pre .remove

module.exports = mongoose.model("Project", ProjectSchema);
