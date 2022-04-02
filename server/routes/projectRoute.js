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

// TODO: search
router
  .route("/")
  .get(authenticateUser, authorizeUser, getAllProjects)
  .post(authenticateUser, createProject);
router
  .route("/:id")
  .get(authenticateUser, getSingleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);
router
  .route("/:projectId/members")
  .get(authenticateUser, getProjectMembers)
  .post(authenticateUser, createMember);

module.exports = router;
