const express = require("express");
const router = express.Router();

const {
    createReport,
    getAllReports,
    getWeekReport,
    updateReport,
    deleteReport,
    getVal,
} = require("../controllers/reportController");

const {
    authenticateUser,
    authorizeUser,
} = require("../middleware/authentication");

router.use(authenticateUser);

router.route("/:projectId").get(getAllReports).post(createReport);
router.route("/:projectId/:reportId").patch(updateReport).delete(deleteReport);
router.route("/:projectId/:week").get(getWeekReport);

module.exports = router;
