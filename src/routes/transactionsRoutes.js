const express = require("express");
const transactionsController = require("../controllers/transactionsController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Transaction
 *     description: Transaction endpoints
 */

/**
 * @swagger
 * /api/transactions/income:
 *   post:
 *     tags: [Transaction]
 *     summary: Add a new income transaction for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Transaction'
 *     responses:
 *       201:
 *         description: Transaction successfully created.
 *       400:
 *         description: Bad request, validation errors.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.post(
  "/income",
  authMiddleware,
  transactionsController.addIncomeTransaction
);

router.post(
  "/expenses",
  authMiddleware,
  transactionsController.addExpensesTransaction
);
/**
 * @swagger
 * /api/transactions/income:
 *   get:
 *     tags: [Transaction]
 *     summary: Retrieve all income transactions for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved income transactions.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.get(
  "/income",
  authMiddleware,
  transactionsController.getIncomeTransactionsByUser
);

/**
 * @swagger
 * /api/transactions/expenses:
 *   get:
 *     tags: [Transaction]
 *     summary: Retrieve all expenses transactions for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved expenses transactions.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/expenses",
  authMiddleware,
  transactionsController.getExpensesTransactionsByUser
);

/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     tags: [Transaction]
 *     summary: Delete a transaction by its ID for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The transaction ID.
 *     responses:
 *       200:
 *         description: Transaction successfully deleted.
 *       400:
 *         description: Bad request, invalid transaction ID.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.delete("/", authMiddleware, transactionsController.deleteTransaction);

module.exports = router;
