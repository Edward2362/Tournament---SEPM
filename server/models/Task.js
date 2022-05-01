const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: [true, "Please provide project ID"],
    },
    trelloTaskId: {
        type: String,
        required: [true, "Please provide the ID of your trello task"],
    },
    taskName: {
        type: String,
        default: "",
    },
    memberIncharged: {
        type: mongoose.Types.ObjectId,
        ref: "Member",
        required: [true, "Please provide member ID"],
    },
    subTask: [
        {
            trelloTaskId: {
                type: String,
            },
            taskName: {
                type: String,
                default: "",
            },
            memberIncharged: {
                type: mongoose.Types.ObjectId,
                ref: "Member",
            },
            percentage: {
                type: Number,
                default: 0,
            },
            finished: {
                type: Boolean,
                default: null,
            },
        },
    ],
    percentage: {
        type: Number,
        default: 0,
    },
    finished: {
        type: Boolean,
        default: false,
    },
});

TaskSchema.pre("remove", async function () {
    await this.deleteOne({ trelloTaskId: this._id });
});

module.exports = mongoose.model("Task", TaskSchema);
