const { ROLES, userModel } = require("../models");
const { LogController } = require("../controllers/log.controller");

class VerifyMW {
  static async checkDuplicateUsernameOrEmail(req, res, next) {
    try {
      // Username
      const user = await userModel
        .findOne({
          username: req.body.username,
        })
        .exec();
      // Username already in use
      if (user) {
        res.status(400).send({ message: "Failed! Username unavailable!" });
        return;
      }

      // Email
      const email = await userModel
        .findOne({
          email: req.body.email,
        })
        .exec();
      // Email already in use
      if (email) {
        res.status(400).send({ message: "Failed! Email is already in use!" });
        return;
      }

      // Both Username and Email available
      next();
    } catch (err) {
      LogController.logger.error(err);
      res.status(500).send({
        location: "Verify Register",
        type: "Database error!",
        message: err,
      });
    }
  }

  static checkRolesExisted(req, res, next) {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        const role = req.body.roles[i];
        if (!ROLES.includes(role)) {
          res.status(400).send({
            message: `Failed! Role ${role} does not exist!`,
          });
          return;
        }
      }
    }

    next();
  }
}

module.exports = { VerifyMW };
