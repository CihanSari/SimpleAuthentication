const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getRoutes } = require("./routes");
const { LogController } = require("./controllers/log.controller");
const { URL, PORT } = require("./config/server.config.js");
const { UserModel } = require("./models");

const app = express();

app.use(cors());

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use(getRoutes());

UserModel.init();

// set port, listen for requests
app.listen(PORT, () => {
  LogController.logger.info(`Server at ${URL} is running on port ${PORT}.`);
});
