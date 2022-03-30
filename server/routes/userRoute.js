const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getCurrentUser,
  updatePassword,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const { getUserProjects } = require("../controllers/projectController");

const { getUserMemberships } = require("../controllers/membershipController");

const { authenticateUser } = require("../middleware/authentication");

// TODO: search
router.route("/").get(getAllUsers);
router.route("/me/projects").get(authenticateUser, getUserProjects);
router.route("/me/memberships").get(authenticateUser, getUserMemberships);
router
  .route("/me")
  .get(authenticateUser, getCurrentUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);
router.route("/me/password").patch(authenticateUser, updatePassword);

module.exports = router;
