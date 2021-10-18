const express = require("express");
const { getAuthRoutes } = require("./auth.routes");
const { getUserRoutes } = require("./user.routes");

const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const { join } = require("path");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Simple authentication example",
    version: "1.0.0",
    description: "REST API interface for simple authentication example.",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Cihan Sari",
      url: "https://cihansari.com",
    },
  },
  servers: [
    {
      url: "http://localhost:8080",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to route files
  apis: [join(__dirname, "/*.routes.js")],
};

const swaggerSpec = swaggerJSDoc(options);
const getRoutes = () => {
  const router = express.Router();
  // Place holder blank get
  router.get("/", (_, res) => {
    res.json({ message: "Welcome to the application." });
  });
  const apiRouter = express.Router();
  // Authentication routes
  apiRouter.use(getAuthRoutes());
  // User routes
  apiRouter.use(getUserRoutes());
  // OpenAPI documentation
  apiRouter.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  apiRouter.get("/swagger.json", (_, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  router.use("/api", apiRouter);
  return router;
};
module.exports = { getRoutes };
