const Sequelize = require("sequelize-cockroachdb");
const { HOST, PORT, DB, USER, PASS } = require("../config/db.config.js");

class DatabaseController {
  static sequelize = new Sequelize({
    dialect: "postgres",
    username: USER,
    password: PASS,
    host: HOST,
    port: PORT,
    database: DB,
    logging: false,
  });
}

module.exports = { DatabaseController };
