const mongoose = require("mongoose");
const { userModel } = require("./user.model");
const { roleModel } = require("./role.model");
module.exports = {
  mongoose,
  userModel,
  roleModel,
  ROLES: ["user", "admin", "moderator"],
};
