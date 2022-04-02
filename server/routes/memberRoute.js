const express = require("express");
const router = express.Router();

const {
  getSingleMember,
  createMember,
  updateMember,
  deleteMember,
  getALlMembers,
} = require("../controllers/memberController");

const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authentication");

// TODO: search
router
  .route("/")
  .get(authenticateUser, authorizeUser, getALlMembers)
  .post(authenticateUser, createMember);
router
  .route("/:id")
  .get(authenticateUser, getSingleMember)
  .patch(authenticateUser, updateMember)
  .delete(authenticateUser, deleteMember);

module.exports = router;
