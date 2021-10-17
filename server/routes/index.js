const express = require("express");
const { getAuthRoutes } = require("./auth.routes");
const { getUserRoutes } = require("./user.routes");

const getRoutes = () => {
  const router = express.Router();
  router.use(getAuthRoutes());
  router.use(getUserRoutes());
  return router;
};
module.exports = { getRoutes };
