const { StatusCodes } = require("http-status-codes");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const Member = require("../models/Member");
const User = require("../models/User");
const Report = require("../models/Report");
const { createQueryObject, chainSF } = require("../utils");
const { NotFoundError } = require("../errors");

const createReport = async (req, res) => {
    const { projectId } = req.params;

    var tasks = await Task.aggregate([
        { $match: { finished: true, checked: false } },
        {
            $group: {
                _id: "$memberIncharged",
                totalPoint: { $push: { percentage: "$percentage" } },
            },
        },
        { $sort: { _id: 1 } },
    ]);

    if (tasks == 0) {
        res.status(200).send(
            "No finished task(s) that can be used for reporting."
        );
    } else {
        const ObjectId = mongoose.Types.ObjectId;
        var finished_task = await Task.find(
            {
                projectId: ObjectId(projectId),
                finished: true,
                checked: false,
            },
            "_id"
        );
        var finished_tasks = JSON.stringify(finished_task)
            .replace('},{"_id":', ",")
            .replace(/[\[\]&\/\\#_+()$~%.'":*?<>{}]/g, "")
            .replace("id", "")
            .split(",");

        let finished_tasks_arr = finished_tasks.map((s) =>
            mongoose.Types.ObjectId(s)
        );
        var task2 = await Task.updateMany(
            { finished: true, checked: false },
            { checked: true }
        );

        var arr = [];
        for (let i = 0; i < tasks.length; i++) {
            arr[i] = JSON.stringify(tasks[i]);
        }

        const info_arr = [];
        const userId_arr = [];
        const user_arr = [];
        for (let i = 0; i < arr.length; i++) {
            const edited_arr = arr[i]
                .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "")
                .replace("_id", "")
                .replace("totalPoint[percentage", ",")
                .replace("percentage", ",")
                .replace("]", "");
            const splited_arr = edited_arr.split(",");

            var percentage_sum = 0;
            for (let i = 1; i < splited_arr.length; i++) {
                arr_num = parseInt(splited_arr[i]);
                percentage_sum += arr_num;
            }

            const ObjectId = mongoose.Types.ObjectId;
            const member_user = await Member.find(
                { _id: ObjectId(splited_arr[0]) },
                "-_id user"
            );
            const user_id = JSON.stringify(member_user)
                .replace(/[\[\]&\/\\#,+()$~%.'":*?<>{}]/g, "")
                .replace("user", "");

            const user_username = await User.find(
                { _id: ObjectId(user_id) },
                "-_id username"
            );
            var username = JSON.stringify(user_username)
                .replace(/[\[\]&\/\\#,+()$~%.'":*?<>{}]/g, "")
                .replace("username", "");

            // 0: memberId, 1: total points of finished task(s)
            const final_arr = [];
            final_arr[0] = username;
            final_arr[1] = percentage_sum;

            // 2d array: [[username1, totalPoint1], [username2, totalPoint2], ..]
            info_arr.push(final_arr);

            user_arr[i] = splited_arr[0];
            userId_arr.push(user_arr);
        }

        //
        var countReport = await Report.where({
            projectId: ObjectId(projectId),
        }).countDocuments();
        report_week = parseInt(countReport) + 1;

        //Create new Report
        const report = await Report.create({
            projectId,
            data: info_arr,
            tasks: finished_tasks_arr,
            week: report_week,
        });

        // Update the overallPoint of members
        for (let i = 0; i < info_arr.length; i++) {
            const ObjectId = mongoose.Types.ObjectId;
            member_id = user_arr[i];
            num = info_arr[i][1];
            const members = await Member.find(
                { _id: ObjectId(member_id) },
                "-_id overallPoint"
            );

            var arr2 = JSON.stringify(members);
            var edited_arr2 = arr2
                .replace(/[\[\]&\/\\#,+()$~%.'"*?<>{}]/g, "")
                .split(":");
            var arr2_num = parseInt(edited_arr2[1]);
            var member = await Member.findOneAndUpdate(
                { _id: ObjectId(member_id) },
                { overallPoint: num + arr2_num }
            );
        }

        res.status(StatusCodes.OK).json({ data: report });
    }
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
