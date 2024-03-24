const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags: [Auth]
 *     summary: Registers a new user and returns JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user.
 *     responses:
 *       201:
 *         description: User registered successfully, JWT returned.
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
 *                   example: 201
 *                   description: Status code.
 *                 result:
 *                   example:
 *                     user:
 *                       email: test@gmail.com.
 *                       balance: 0
 *                       avatarUrl: https://ui-avatars.com/api/?name=T&background=random&size=128.
 *                       token: eyJhGciOiJIUzINiIsInR5cCIIkpXVCJ9.eyJZCI6IjY1ZmRjMmYM2ViZWFmNGEyZjIwN2ZhZCIsImlhdC6MTcxTEyOTMzNiwiZXhwIjxNzExMTMyOTM2fQ._eWN2Hb1kqQkI39pxw6_FIYr1w-aC2k0DZutbVxl8
 *       400:
 *         description: Bad request, possibly due to missing fields or invalid input.
 *       409:
 *         description: Conflict, user already exists.
 *
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticates a user and returns JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email of the user.
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user.
 *     responses:
 *       200:
 *         description: User authenticated successfully, JWT returned.
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
 *                   example: 201
 *                   description: Status code.
 *                 result:
 *                   example:
 *                     user:
 *                       email: test@gmail.com.
 *                       balance: 0
 *                       avatarUrl: https://ui-avatars.com/api/?name=T&background=random&size=128.
 *                       token: eyJhGciOiJIUzINiIsInR5cCIIkpXVCJ9.eyJZCI6IjY1ZmRjMmYM2ViZWFmNGEyZjIwN2ZhZCIsImlhdC6MTcxTEyOTMzNiwiZXhwIjxNzExMTMyOTM2fQ._eWN2Hb1kqQkI39pxw6_FIYr1w-aC2k0DZutbVxl8
 *       400:
 *         description: Bad request, possibly due to missing fields or invalid input.
 *
 * @swagger
 * /api/auth/logout:
 *   get:
 *     tags: [Auth]
 *     summary: Logs out a user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User logged out successfully.
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
 *                   example: User logged out successfully.
 *                   description: A message confirming that the user has been logged out.
 *       401:
 *         description: Unauthorized, no token provided or token is invalid.
 *       500:
 *         description: Internal server error
 */
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authMiddleware, authController.logout);

module.exports = router;
