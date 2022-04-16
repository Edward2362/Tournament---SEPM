const express = require("express");
const router = express.Router();

const {
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
  getAllProjects,
} = require("../controllers/projectController");

const {
  createMember,
  getProjectMembers,
} = require("../controllers/memberController");

const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authentication");

router.use(authenticateUser);

router.route("/").get(authorizeUser, getAllProjects).post(createProject);
router
  .route("/:id")
  .get(getSingleProject)
  .patch(updateProject)
  .delete(deleteProject);
router.route("/:projectId/members").get(getProjectMembers).post(createMember);

module.exports = router;
