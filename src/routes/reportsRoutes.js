const express = require("express");
const reportsController = require("../controllers/reportsController");
const router = express.Router();

router.get("/income/:userId", reportsController.getIncomeReport);
router.get("/expense/:userId", reportsController.getExpenseReport);

module.exports = router;
