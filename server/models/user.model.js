const Sequelize = require("sequelize-cockroachdb");
const { DatabaseController } = require("../controllers/db.controller");
class UserModel {
  static init() {
    UserModel.users.sync();
  }
  static users = DatabaseController.sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: Sequelize.TEXT,
    },
    password: {
      type: Sequelize.STRING,
    },
    roles: {
      type: Sequelize.STRING,
      get() {
        return this.getDataValue("roles").split(";");
      },
      set(val) {
        this.setDataValue("roles", val.join(";").toUpperCase());
      },
    },
  });
}

module.exports = { UserModel };
