const express = require("express");
const UserController = require("../controllers/user");
const router = express.Router();

router.post("/signUp", UserController.createAgent);
router.post("/login", UserController.Login);

module.exports = router;