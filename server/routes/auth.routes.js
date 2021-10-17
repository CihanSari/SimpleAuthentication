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
    "/api/auth/register",
    [VerifyMW.checkDuplicateUsernameOrEmail, VerifyMW.checkRolesExisted],
    AuthController.register
  );

  router.post("/api/auth/login", AuthController.login);
  return router;
}
module.exports = { getAuthRoutes };
