/**
 * @swagger
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         location:
 *           type: string
 *           description: Error location for reporting.
 *           example: Authentication
 *         type:
 *           type: string
 *           description: Error type for reporting.
 *           example: Database error!
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Unauthorized!
 *   parameters:
 *     AccessToken:
 *       name: "x-access-token"
 *       in: header
 *       description: Access token
 *       required: true
 *       type: string
 * /api/auth/register:
 *   post:
 *     summary: Register a user.
 *     description: Registers a user with the given role. Currently everyone can register.
 *     requestBody:
 *       description: User registration body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email must be unique.
 *                 example: example@mail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: EH62zsK4qb~^.b/@
 *               roles:
 *                 type: array
 *                 example:
 *                   - user
 *                   - moderator
 *                   - admin
 *                 items:
 *                   type: string
 *                   description: User roles.
 *     responses:
 *       200:
 *         description: User registered.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: User registered message.
 *                   example: User was registered successfully!
 *       406:
 *         description: Missing parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Registering user failed message.
 *                   example: Missing email or password!
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /api/auth/login:
 *   post:
 *     summary: Login with a user.
 *     description: Logs the user in and returns a JWT token.
 *     requestBody:
 *       description: User login body
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: example@mail.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: EH62zsK4qb~^.b/@
 *     responses:
 *       200:
 *         description: User information logged in.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User id.
 *                   example: 616k4jc743346f14273d97f9
 *                 email:
 *                   type: string
 *                   description: User email.
 *                   example: example@mail.com
 *                 roles:
 *                   type: array
 *                   items:
 *                     type: string
 *                     description: User roles.
 *                     example: ROLE_ADMIN
 *                 accessToken:
 *                   type: string
 *                   description: User access token
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNmM0Y2M3ODMyNDZlMTQxNzNjOTdmOSIsImlhdCI6MTYzNDU0MzM0MiwiZXhwIjoxNjM0ODQzMzQyfQ.cEcJ-3T20NhK7MUWEkXiMnocbkaNbizSMM-SO1b86Wk
 *       404:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message.
 *                   example: User not found!
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const express = require("express");
const { VerifyMW } = require("../middlewares");
const { AuthController } = require("../controllers/auth.controller");

function getAuthRoutes() {
  const router = express.Router();
  router.use((_, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post(
    "/auth/register",
    [VerifyMW.checkDuplicateEmail, VerifyMW.checkRolesExisted],
    AuthController.register
  );

  router.post("/auth/login", AuthController.login);
  return router;
}
module.exports = { getAuthRoutes };
