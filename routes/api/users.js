const express = require("express");
const router = express.Router();
const usersCtrl = require("../../controllers/api/users");
const ensureLoggedIn = require("../../config/ensureLoggedIn");

// GET /api/users/:userId
// router.get("/:userId", ensureLoggedIn, usersCtrl.getUserInfo);

// POST /api/users
router.post("/", usersCtrl.create);

router.post("/login", usersCtrl.login);

router.get("/check-token", ensureLoggedIn, usersCtrl.checkToken);

module.exports = router;
