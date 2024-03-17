const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *        type: object
 *        required:
 *           - email
 *           - password
 *        properties:
 *           _id:
 *              type: string
 *              description: The auto-generated id of the user
 *           email:
 *              type: string
 *              description: User email
 *           password:
 *              type: string
 *              description: Hashed user password
 *        example:
 *           _id: 65f4a4b12e22a2c00cd7d50b
 *           email: test@gmail.com
 *           password: $2a$10$PbWfkYH/.KOBrQuvhmyj2e3S3U/8EFB1Y0c/L7XZfw6a5r6/vih2q
 */

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Returns registered user and token JWT
 *     responses:
 *       200:
 *         description: Registered user
 *         content:
 *         application/json:
 *           schema:
 *             type: object
 *             items:
 *               $ref: `#/components/schemas/User`
 */

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/logout", authMiddleware, authController.logout);

module.exports = router;
