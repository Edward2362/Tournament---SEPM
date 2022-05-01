const { StatusCodes } = require("http-status-codes");
const Task = require("../models/Task");
const Member = require("../models/Member");
const Report = require("../models/Report");
const { createQueryObject, chainSF } = require("../utils");
const { NotFoundError } = require("../errors");

const createReport = async (req, res) => {
    const { projectId } = req.params;
    const { tasks, week, end } = req.body;

    const report = await Report.create({
        projectId,
        tasks: tasks,
        week,
        end,
    });
    res.status(StatusCodes.CREATED).json({ data: report });
};

const getAllReports = async (req, res) => {
    const { userId } = req.user;
    const { projectId } = req.params;

    await Member.findUserIsMember(userId, projectId);
    var reports = await Report.find({ projectId: projectId });

    res.status(StatusCodes.OK).json({ data: reports });
};

const getWeekReport = async (req, res) => {
    const { userId } = req.user;
    const { projectId } = req.params;
    const { week } = req.params;

    await Member.findUserIsMember(userId, projectId);
    var report = await Report.findOne(
        { trelloProjectId: projectId } && { week: week }
    );
    res.status(StatusCodes.OK).json({ data: report });
};

const updateReport = async (req, res) => {
    const { userId } = req.user;
    const { reportId, projectId } = req.params;
    const { tasks, week, end } = req.body;

    await Member.findUserIsAdmin(userId, projectId);
    const reports = await Report.findOneAndUpdate(
        { _id: reportId, projectId: projectId },
        { tasks, week, end },
        { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ data: reports });
};

const deleteReport = async (req, res) => {
    const { userId } = req.user;
    const { projectId, reportId } = req.params;

    await Member.findUserIsAdmin(userId, projectId);
    const report = await Report.findOne({ _id: reportId });
    await report.remove();

    res.status(StatusCodes.OK).json({ message: "Report deleted" });
};

module.exports = {
    createReport,
    getAllReports,
    getWeekReport,
    updateReport,
    deleteReport,
};
