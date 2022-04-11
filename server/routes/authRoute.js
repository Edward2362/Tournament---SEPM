const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/authController");
const authController = require("../controllers/authController");

router.post("/login", login);
router.post("/register", register);
router.get("/logout", authController.logout);

module.exports = router;
