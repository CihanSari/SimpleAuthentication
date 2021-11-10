const { authSecret, resetSecret } = require("../config/auth.config");
const { UserModel } = require("../models");
const { LogController } = require("./log.controller");

const { sign } = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, roles } = req.body;
      if (email == null || password == null) {
        res.status(406).send({ message: "Missing email or password" });
        return;
      }
      const passwordHash = hashSync(password, 10);
      LogController.logger.info(`Registering user: ${email}...`);
      const user = UserModel.users.build({
        email,
        password: passwordHash,
        roles,
      });
      await user.save();
      res.send({ message: "User was registered successfully!" });
    } catch (err) {
      LogController.logger.error(err);
      res.status(500).send({
        location: "Authentication",
        type: "Database error!",
        message: err,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      if (email == null || password == null) {
        res.status(406).send({ message: "Missing email or password" });
        return;
      }
      const user = await UserModel.users.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(404).send({ message: "User not found!" });
      }
      const passwordIsValid = compareSync(password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }
      const token = sign({ id: user.id }, authSecret, {
        expiresIn: 5 * 60 * 1000, // 5 minutes
      });

      let authorities = [];
      user.roles.map((role) => role);
      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i]);
      }
      res.status(200).send({
        id: user.id,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    } catch (err) {
      LogController.logger.error(err);
      res.status(500).send({
        location: "Authentication",
        type: "Database error!",
        message: err,
      });
    }
  }
}

module.exports = { AuthController };
