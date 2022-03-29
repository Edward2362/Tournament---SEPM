const express = require("express");
const router = express.Router();

const {
  getSingleMembership,
  createMembership,
  updateMembership,
  deleteMembership,
} = require("../controllers/projectController");

const authenticateUser = require("../middleware/authentication");

// TODO: search
router.route("/").post(authenticateUser, createMembership);
router
  .route("/:id")
  .get(authenticateUser, getSingleMembership)
  .patch(authenticateUser, updateMembership)
  .delete(authenticateUser, deleteMembership);

module.exports = router;
