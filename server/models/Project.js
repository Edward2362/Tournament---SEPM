const dayjs = require("dayjs");
const mongoose = require("mongoose");

const LastAccessSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
		required: [true, "Please provide user ID"],
	},
	date: {
		type: Date,
		default: dayjs().toDate(),
	},
});

const ProjectSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: [true, "Please provide name"],
		},
		upperBoundary: {
			type: Number,
			default: 0,
		},
		lowerBoundary: {
			type: Number,
			default: 0,
		},
		trelloBoardId: {
			type: String,
			required: [true, "Please provide the ID of your trello board"],
		},
		admin: {
			type: mongoose.Types.ObjectId,
			ref: "User",
			required: [true, "Please provide admin ID"],
		},
		finished: {
			type: Boolean,
			default: false,
		},
		lastAccessed: [LastAccessSchema],
	},
	{ timestamps: true }
);

ProjectSchema.virtual("members", {
	ref: "Member",
	localField: "_id",
	foreignField: "project",
});

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
