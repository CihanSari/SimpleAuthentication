const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DatabaseController } = require("./server/controllers/db.controller");
const { getRoutes } = require("./server/routes");
const { LogController } = require("./server/controllers/log.controller");
const app = express();

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize database
DatabaseController.initDB();

// routes
app.use(getRoutes());

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  LogController.logger.info(`Server is running on port ${PORT}.`);
});
