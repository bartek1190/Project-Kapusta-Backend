const express = require("express");
const reportsController = require("../controllers/reportsController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: Transaction endpoints
 */
/**
 * @swagger
 * /api/reports/income-by-period:
 *   get:
 *     tags: [Reports]
 *     summary: Get income report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income report data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: Status of the call.
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Status code.
 *                 report:
 *                   example: {}
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/income-by-period",
  authMiddleware,
  reportsController.getIncomePeriodReport
);

/**
 * @swagger
 * /api/reports/expenses-by-period:
 *   get:
 *     tags: [Reports]
 *     summary: Get expenses report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses report data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: Status of the call.
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Status code.
 *                 report:
 *                   example: {}
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/expenses-by-period",
  authMiddleware,
  reportsController.getExpensesPeriodReport
);

/**
 * @swagger
 * /api/reports/income-by-category:
 *   get:
 *     tags: [Reports]
 *     summary: Get income report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Income report data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: Status of the call.
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Status code.
 *                 report:
 *                   example: {}
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/income-by-category",
  authMiddleware,
  reportsController.getIncomeCategoryReport
);

/**
 * @swagger
 * /api/reports/expenses-by-category:
 *   get:
 *     tags: [Reports]
 *     summary: Get expenses report for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Expenses report data successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                   description: Status of the call.
 *                 code:
 *                   type: number
 *                   example: 200
 *                   description: Status code.
 *                 report:
 *                   example: {}
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/expenses-by-category",
  authMiddleware,
  reportsController.getExpensesCategoryReport
);

module.exports = router;
