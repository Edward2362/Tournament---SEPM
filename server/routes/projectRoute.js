const express = require("express");
const router = express.Router();

const {
  getSingleProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  createMembership,
  getProjectMemberships,
} = require("../controllers/membershipController");

const authenticateUser = require("../middleware/authentication");

// TODO: search
router.route("/").post(authenticateUser, createProject);
router
  .route("/:id")
  .get(authenticateUser, getSingleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);
router
  .route("/:projectId/memberships")
  .get(authenticateUser, getProjectMemberships)
  .post(authenticateUser, createMembership);

module.exports = router;
