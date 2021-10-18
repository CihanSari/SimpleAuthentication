const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { DatabaseController } = require("./controllers/db.controller");
const { getRoutes } = require("./routes");
const { LogController } = require("./controllers/log.controller");

const app = express();

app.use(cors());

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
