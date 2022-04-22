const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getSingleUser,
  getCurrentUser,
  updatePassword,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { getUserProjects } = require("../controllers/projectController");
const { getUserMembers } = require("../controllers/memberController");

const { authenticateUser } = require("../middleware/authentication");

router.route("/").get(getAllUsers);
router.route("/me/projects").get(authenticateUser, getUserProjects);
router.route("/me/members").get(authenticateUser, getUserMembers);
router
  .route("/me")
  .get(authenticateUser, getCurrentUser)
  .patch(authenticateUser, updateUser)
  .delete(authenticateUser, deleteUser);
router.route("/me/password").patch(authenticateUser, updatePassword);
router.route("/:id").get(getSingleUser);

module.exports = router;
