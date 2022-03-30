const mongoose = require("Mongoose");

const TaskSchema = mongoose.schema({
    trelloProjectId: {
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
        type: String,
    },
    subTask: {
        type: mongoose.Types.ObjectId,
        ref: "SubTask",
    },
    percentage: {
        type: number,
        default: 0,
    },
    finished: {
        type: Boolean,
        default: false,
    },
});

ProjectSchema.pre("remove", async function () {
    await this.deleteOne({ trelloTaskId: this._id });
    await this.model("SubTask").deleteMany({
        trelloTaskId: this._trelloTaskId,
    });
});

module.exports = mongoose.model("Task", TaskSchema);
