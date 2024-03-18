const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/income", authMiddleware, categoriesController.getIncomeCategories);

router.get(
  "/expenses",
  authMiddleware,
  categoriesController.getExpensesCategories
);

module.exports = router;
