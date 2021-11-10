const { ROLES, UserModel } = require("../models");
const { LogController } = require("../controllers/log.controller");

class VerifyMW {
  static checkDuplicateEmail(req, res, next) {
    try {
      // Email
      UserModel.users
        .findOne({
          where: { email: req.body.email },
        })
        .then((anotherUser) => {
          if (anotherUser == null) {
            next();
          } else {
            res
              .status(400)
              .send({ message: "Failed! Email is already in use!" });
          }
        });
    } catch (err) {
      LogController.logger.error(err);
      res.status(500).send({
        location: "Verify Register",
        type: "Database error!",
        message: err,
      });
    }
  }

  static checkRolesExists(req, res, next) {
    try {
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
    } catch (err) {
      LogController.logger.error(err);
      res.status(500).send({
        location: "Verify Register",
        type: "Database error!",
        message: err,
      });
    }
  }
}

module.exports = { VerifyMW };
