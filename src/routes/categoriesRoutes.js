const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Categories endpoints
 */
/**
 * @swagger
 * /api/categories/income:
 *   get:
 *     tags: [Categories]
 *     summary: Returns an array of income categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully returns an array of income categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/IncomeCategories'
 *       401:
 *         description: Invalid token.
 */

router.get("/income", authMiddleware, categoriesController.getIncomeCategories);

/**
 * @swagger
 * /api/categories/expenses:
 *   get:
 *     tags: [Categories]
 *     summary: Returns an array of expenses categories
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully returns an array of expenses categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ExpensesCategories'
 *       401:
 *         description: Invalid token.
 */

router.get(
  "/expenses",
  authMiddleware,
  categoriesController.getExpensesCategories
);

module.exports = router;
