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
 *             $ref: '#/components/schemas/IncomeTransaction'
 *           example:
 *             date: "19.03.2024"
 *             category: "Salary"
 *             description: "Monthly salary"
 *             amount: 5000
 *     responses:
 *       201:
 *         description: Transaction successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: "19.03.2024"
 *                 type:
 *                   type: string
 *                   example: "income"
 *                 category:
 *                   type: string
 *                   example: "Salary"
 *                 description:
 *                   type: string
 *                   example: "Monthly salary"
 *                 amount:
 *                   type: number
 *                   example: 5000
 *                 user:
 *                   type: string
 *                   example: "65f874410a288365085a5608"
 *                 _id:
 *                   type: string
 *                   example: "65f4a4b12e22a2c00cd7d50b"
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

/**
 * @swagger
 * /api/transactions/expenses:
 *   post:
 *     tags: [Transaction]
 *     summary: Add a new expenses transaction for the logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExpensesTransaction'
 *           example:
 *             date: "19.03.2024"
 *             category: "Products"
 *             description: "Apples"
 *             amount: 20
 *     responses:
 *       201:
 *         description: Transaction successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 date:
 *                   type: string
 *                   example: "19.03.2024"
 *                 type:
 *                   type: string
 *                   example: "expenses"
 *                 category:
 *                   type: string
 *                   example: "Products"
 *                 description:
 *                   type: string
 *                   example: "Apples"
 *                 amount:
 *                   type: number
 *                   example: 20
 *                 user:
 *                   type: string
 *                   example: "65f874410a288365085a5608"
 *                 _id:
 *                   type: string
 *                   example: "65f4a4b12e22a2c00cd7d50b"
 *       400:
 *         description: Bad request, validation errors.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "19.03.2024"
 *                   type:
 *                     type: string
 *                     example: "income"
 *                   category:
 *                     type: string
 *                     example: "Salary"
 *                   description:
 *                     type: string
 *                     example: "Monthly salary"
 *                   amount:
 *                     type: number
 *                     example: 5000
 *                   user:
 *                     type: string
 *                     example: "65f874410a288365085a5608"
 *                   _id:
 *                     type: string
 *                     example: "65f4a4b12e22a2c00cd7d50b"
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   date:
 *                     type: string
 *                     example: "19.03.2024"
 *                   type:
 *                     type: string
 *                     example: "expenses"
 *                   category:
 *                     type: string
 *                     example: "Products"
 *                   description:
 *                     type: string
 *                     example: "Apples"
 *                   amount:
 *                     type: number
 *                     example: 20
 *                   user:
 *                     type: string
 *                     example: "65f874410a288365085a5608"
 *                   _id:
 *                     type: string
 *                     example: "65f4a4b12e22a2c00cd7d50b"
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
 *                 message:
 *                   type: string
 *                   example: Transaction successfully deleted.
 *       400:
 *         description: Bad request, invalid transaction ID.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       500:
 *         description: Internal server error.
 */

router.delete("/:id", authMiddleware, transactionsController.deleteTransaction);

module.exports = router;
