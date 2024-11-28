const express = require("express");
const router = express.Router();
const emailController = require("../controllers/emailController");

router.post("/send", emailController.sendContactFormEmail);
router.post("/timestaff", emailController.sendTimestaff);

module.exports = router;
