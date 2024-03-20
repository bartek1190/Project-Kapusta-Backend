const express = require("express");
const usersController = require("../controllers/usersController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   - name: User
 *     description: User endpoints
 */

/**
 * @swagger
 * /api/users/info:
 *   get:
 *     tags: [User]
 *     summary: Retrieve a user's details
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User details retrieved successfully
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.get("/info", authMiddleware, usersController.getUser);

/**
 * @swagger
 * /api/users/balance:
 *   patch:
 *     tags: [User]
 *     summary: Update the user's balance
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               balance:
 *                 type: number
 *                 description: New balance to update
 *     responses:
 *       200:
 *         description: Balance updated successfully
 *       400:
 *         description: Bad request, validation errors
 *       401:
 *         description: Unauthorized, token missing or invalid
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

router.patch("/balance", authMiddleware, usersController.updateUserBalance);

module.exports = router;
