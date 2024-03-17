const express = require("express");
const reportsController = require("../controllers/reportsController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
/**
 * @swagger
 * tags:
 *   name: Transaction
 *   description: Transaction endpoints
 */
/**
 * @swagger
 * /api/reports/income:
 *   get:
 *     tags: [Transaction]
 *     summary: Get income report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income report data successfully retrieved.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get("/income", authMiddleware, reportsController.getIncomeReport);

/**
 * @swagger
 * /api/reports/expenses:
 *   get:
 *     tags: [Transaction]
 *     summary: Get expenses report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses report data successfully retrieved.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get("/expenses", authMiddleware, reportsController.getExpenseReport);

module.exports = router;
