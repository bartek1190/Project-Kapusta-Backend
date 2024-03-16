const express = require("express");
const transactionsController = require("../controllers/transactionsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, transactionsController.addTransaction);
router.get(
  "/user/:userId",
  authMiddleware,
  transactionsController.getTransactionsByUser
);
router.delete("/", authMiddleware, transactionsController.deleteTransaction);

module.exports = router;
