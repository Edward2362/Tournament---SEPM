const mongoose = require("Mongoose");

const SubTaskSchema = mongoose.schema({
    trelloProjectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: [true, "Please provide project ID"],
    },
    trelloTaskId: {
        type: String,
        required: [true, "Please provide the ID of your trello task"],
    },
    subTaskName: {
        type: String,
        default: "",
    },
    memberIncharged: {
        type: String,
        default: "",
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
    await this.deleteOne({
        trelloTaskId: this._id,
        subTaskName: this._subTaskName,
    });
});

module.exports = mongoose.model("SubTask", SubTaskSchema);
