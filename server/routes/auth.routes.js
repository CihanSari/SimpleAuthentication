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
 *   securitySchemes:
 *     bearerAuth:            # arbitrary name for the security scheme
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT    # optional, arbitrary value for documentation purposes
 *
 * security:
 *   - bearerAuth: []
 */
const express = require("express");
const { AuthController } = require("../controllers/auth.controller");

function getAuthRoutes() {
  const router = express.Router();
  router.use((_, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "keycloak-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // router.post("/auth/login", AuthController.login);
  return router;
}
module.exports = { getAuthRoutes };
