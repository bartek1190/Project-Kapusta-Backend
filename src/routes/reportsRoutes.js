const express = require("express");
const reportsController = require("../controllers/reportsController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/income", authMiddleware, reportsController.getIncomeReport);
router.get("/expense", authMiddleware, reportsController.getExpenseReport);

module.exports = router;
