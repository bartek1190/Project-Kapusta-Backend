const express = require("express");
const transactionsController = require("../controllers/transactionsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, transactionsController.addTransaction); // Użyj middleware tutaj
router.get(
  "/user/:userId",
  authMiddleware,
  transactionsController.getTransactionsByUser
); // I tutaj

module.exports = router;
