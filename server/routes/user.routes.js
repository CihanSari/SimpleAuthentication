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

  router.get("/api/test/all", UserAccess.allAboard);

  router.get("/api/test/user", [AuthMW.verifyToken], UserAccess.userAccess);

  router.get(
    "/api/test/admin",
    [AuthMW.verifyToken, AuthMW.isAdmin],
    UserAccess.adminAccess
  );

  router.get(
    "/api/test/mod",
    [AuthMW.verifyToken, AuthMW.isModerator],
    UserAccess.modAccess
  );
  return router;
}

module.exports = { getUserRoutes };
