const express = require("express");
const res = require("express/lib/response");
const router = express.Router();

const {
    createTask,
    getAllTask,
    getTaskOfMember,
    updateTask,
    deleteTask,
    getAllTasks,
} = require("../controllers/taskController");

const {
    authenticateUser,
    authorizeUser,
} = require("../middleware/authentication");

router.use(authenticateUser);

router.route("/:projectId").get(getAllTasks).post(createTask);
router.route("/:projectId/:taskId").patch(updateTask).delete(deleteTask);
router.route("/:projectId/:memberId/tasks").get(getTaskOfMember);

module.exports = router;
