const express = require("express");
const router = express.Router();

const {
  getSingleMember,
  createMember,
  updateMember,
  deleteMember,
  getAllMembers,
} = require("../controllers/memberController");

const {
  authenticateUser,
  authorizeUser,
} = require("../middleware/authentication");

router.use(authenticateUser);

router.route("/").get(authorizeUser, getAllMembers).post(createMember);
router
  .route("/:id")
  .get(getSingleMember)
  .patch(updateMember)
  .delete(deleteMember);

module.exports = router;
