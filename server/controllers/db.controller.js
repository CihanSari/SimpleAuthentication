const { mongoose, roleModel } = require("../models");
const { HOST, PORT, DB } = require("../config/db.config.js");
const { LogController } = require("./log.controller");

function addRole(name) {
  new roleModel({
    name,
  }).save((err) => {
    if (err) {
      LogController.logger.error(err);
      return;
    }
    LogController.logger.info(`added ${name} to roles collection`);
  });
}

function initialize() {
  roleModel.estimatedDocumentCount((err, count) => {
    if (err) {
      LogController.logger.error(err);
      process.exit();
    }
    if (count < 3) {
      addRole("user");
      addRole("moderator");
      addRole("admin");
    } else {
      LogController.logger.info(`${count} roles in collection.`);
    }
  });
}

class DatabaseController {
  static initDB() {
    mongoose
      .connect(`mongodb://${HOST}:${PORT}/${DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        LogController.logger.info("Successfully connect to MongoDB.");
        initialize();
      })
      .catch((err) => {
        LogController.logger.error(`Connection error ${err}.`);
        process.exit();
      });
  }
}

module.exports = { DatabaseController };
