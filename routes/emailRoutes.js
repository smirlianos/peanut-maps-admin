const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send", emailController.sendTestEmail);
router.post("/timestaff", emailController.sendTimestaff);

module.exports = router;
