const mongoose = require("Mongoose");

const ReportSchema = mongoose.schema({
    trelloProjectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: [true, "Please provide project ID"],
    },
    week: {
        type: number,
        require: true,
        default: 1,
    },
    tasks: {
        type: mongoose.Types.ObjectId,
        ref: "Task",
    },
    end: {
        type: boolean,
    },
});

ProjectSchema.pre("remove", async function () {
    await this.deleteMany({ trelloProjectId: this._id });
});

module.exports = mongoose.model("Report", ReportSchema);
