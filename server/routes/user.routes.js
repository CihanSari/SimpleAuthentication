/**
 * @swagger
 * components:
 *   schemas:
 *     InvalidToken:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Unauthorized!
 *     MissingRole:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: Requires Admin Role!
 *     NoToken:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Error message.
 *           example: No token provided!
 * /api/test/guest:
 *   get:
 *     summary: Access guest content.
 *     description: Access content without any login requirement.
 *     responses:
 *       200:
 *         description: Guest content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Public guest content.
 *               example: Guest
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /api/test/user:
 *   get:
 *     summary: Access normal user content.
 *     description: Access content using issued token.
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     responses:
 *       200:
 *         description: User content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Private user role content.
 *               example: User
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidToken'
 *       403:
 *         description: Missing role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingRole'
 *       406:
 *         description: Missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoToken'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /api/test/moderator:
 *   get:
 *     summary: Access moderator user content.
 *     description: Access content using issued token.
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     responses:
 *       200:
 *         description: Moderator content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Private moderator role content.
 *               example: Moderator
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidToken'
 *       403:
 *         description: Missing role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingRole'
 *       406:
 *         description: Missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoToken'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 * /api/test/admin:
 *   get:
 *     summary: Access administrator user content.
 *     description: Access content using issued token.
 *     parameters:
 *       - $ref: '#components/parameters/AccessToken'
 *     responses:
 *       200:
 *         description: Administrator content
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               description: Private administrator role content.
 *               example: Administrator
 *       401:
 *         description: Invalid token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvalidToken'
 *       403:
 *         description: Missing role
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MissingRole'
 *       406:
 *         description: Missing token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NoToken'
 *       500:
 *         description: Server error.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

const express = require("express");
const { AuthMW } = require("../middlewares");
const { UserAccess } = require("../controllers/user.controller");

function getUserRoutes() {
  const router = express.Router();

  router.use((_, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  const testRouter = express.Router();

  testRouter.get("/guest", UserAccess.guestUser);

  testRouter.get("/user", [AuthMW.verifyAuthToken], UserAccess.userAccess);

  testRouter.get(
    "/moderator",
    [AuthMW.verifyAuthToken, AuthMW.isModerator],
    UserAccess.modAccess
  );

  testRouter.get(
    "/admin",
    [AuthMW.verifyAuthToken, AuthMW.isAdmin],
    UserAccess.adminAccess
  );

  router.use("/test", testRouter);
  return router;
}

module.exports = { getUserRoutes };
