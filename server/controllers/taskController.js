const { StatusCodes } = require("http-status-codes");
const Project = require("../models/Project");
const Member = require("../models/Member");
const Task = require("../models/Task");
const { createQueryObject, chainSF } = require("../utils");

const createTask = async (req, res) => {
    const { projectId } = req.params;
    const {
        trelloTaskId,
        memberIncharged,
        taskName,
        subTask,
        percentage,
        finished,
    } = req.body;

    const task = await Task.create({
        projectId: projectId,
        trelloTaskId,
        taskName,
        memberIncharged,
        subTask,
        percentage,
        finished,
    });
    res.status(StatusCodes.CREATED).json({ data: task });
};

const getAllTasks = async (req, res) => {
    const { userId } = req.user;
    const { projectId } = req.params;
    
    await Member.findUserIsMember(userId, projectId);
    var tasks = await Task.find({ projectId: projectId });

    res.status(StatusCodes.OK).json({ data: tasks });
};

const getTaskOfMember = async (req, res) => {
    const { userId } = req.user;
    const { projectId, memberId } = req.params;
    const { sort, fields, page, limit } = req.query;

    await Member.findUserIsMember(userId, projectId);
    let tasks = Task.find({ memberIncharged: memberId });

    tasks = chainSF(tasks, {
        sort,
        fields,
        page,
        limit,
    });

    tasks = await tasks;

    res.status(StatusCodes.OK).json({ data: tasks });
};

const updateTask = async (req, res) => {
    const { taskId, projectId } = req.params;
    const { taskName, memberIncharged, subTask, percentage, finished } =
        req.body;

    const tasks = await Task.findOneAndUpdate(
        { _id: taskId, projectId: projectId },
        { taskName, memberIncharged, subTask, percentage, finished },
        { new: true, runValidators: true }
    );

    res.status(StatusCodes.OK).json({ data: tasks });
};

const deleteTask = async (req, res) => {
    const { userId } = req.user;
    const { projectId, taskId } = req.params;

    await Member.findUserIsAdmin(userId, projectId);
    const task = await Task.findOne({ _id: taskId });
    await task.remove();

    res.status(StatusCodes.OK).json({ message: "Task deleted" });
};

module.exports = {
    createTask,
    getTaskOfMember,
    updateTask,
    deleteTask,
    getAllTasks,
};
