const express = require("express");
const router = express.Router();

const {
  getSingleMembership,
  createMembership,
  updateMembership,
  deleteMembership,
  getALlMemberships,
} = require("../controllers/membershipController");

const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authentication");

// TODO: search
router
  .route("/")
  .get(authenticateUser, authorizeUser, getALlMemberships)
  .post(authenticateUser, createMembership);
router
  .route("/:id")
  .get(authenticateUser, getSingleMembership)
  .patch(authenticateUser, updateMembership)
  .delete(authenticateUser, deleteMembership);

module.exports = router;
