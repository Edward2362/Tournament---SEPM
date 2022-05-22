const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const ReportSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        ref: "Project",
        required: [true, "Please provide project ID"],
    },
    week: {
        type: Number,
        require: true,
        default: null,
    },
    data: [],
    tasks: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Task",
            default: null,
        },
    ],
    end: {
        type: Boolean,
        default: false,
    },
});

module.exports = mongoose.model("Report", ReportSchema);
