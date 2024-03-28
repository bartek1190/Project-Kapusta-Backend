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
 *         description: User details retrieved successfully.
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "65f4a4b12e22a2c00cd7d50b"
 *                     email:
 *                       type: string
 *                       example: test@gmail.com
 *                     balance:
 *                       type: number
 *                       example: 0
 *                     token:
 *                       type: string
 *                       example: eyJhGciOiJIUzINiIsInR5cCIIkpXVCJ9.eyJZCI6IjY1ZmRjMmYM2ViZWFmNGEyZjIwN2ZhZCIsImlhdC6MTcxTEyOTMzNiwiZXhwIjxNzExMTMyOTM2fQ._eWN2Hb1kqQkI39pxw6_FIYr1w-aC2k0DZutbVxl8
 *                     googleId:
 *                       example: null
 *                     avatarUrl:
 *                       type: string
 *                       example: https://ui-avatars.com/api/?name=T&background=random&size=128
 *                     password:
 *                       type: string
 *                       example: $2a$10$9nVxemkIp2FjUdGBCiE.irYwAqIc7gd2RlrcLBbJHylfoyxV.
 *       401:
 *         description: Unauthorized, token missing or invalid.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
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
 *                 balance:
 *                   type: number
 *                   example: 10
 *                   description: The email of the user.
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

router.get("/balance", authMiddleware, usersController.getUserBalance);

module.exports = router;
