const express = require("express");
const { getAuthRoutes } = require("./auth.routes");
const { getUserRoutes } = require("./user.routes");

const getRoutes = () => {
  const router = express.Router();
  router.get("/", (_, res) => {
    res.json({ message: "Welcome to the application." });
  });

  router.use(getAuthRoutes());
  router.use(getUserRoutes());
  return router;
};
module.exports = { getRoutes };