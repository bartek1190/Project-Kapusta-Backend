const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/:userId", usersController.getUser);
router.patch("/:userId", authMiddleware, usersController.updateUser);

module.exports = router;
