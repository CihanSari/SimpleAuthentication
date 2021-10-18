const { secret } = require("../config/auth.config");
const { userModel, roleModel } = require("../models");
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
      const passwordHash = hashSync(`${email}${password}`, 10);
      LogController.logger.info(`Registering user: ${email}...`);
      const user = new userModel({
        email,
        passwordHash,
      });
      await user.save();
      if (roles) {
        roleModel.find(
          {
            name: { $in: roles },
          },
          async (err, roles) => {
            if (err) {
              res.status(500).send({
                location: "Authentication",
                type: "Database error!",
                message: err,
              });
              return;
            }

            user.roles = roles.map((role) => role._id);
            await user.save();
            res.send({ message: "User was registered successfully!" });
          }
        );
      } else {
        roleModel.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({
              location: "Authentication",
              type: "Database error!",
              message: err,
            });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({
                location: "Authentication",
                type: "Database error!",
                message: err,
              });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    } catch (err) {
      res.status(500).send({
        location: "Authentication",
        type: "Database error!",
        message: err,
      });
    }
  }

  static login(req, res) {
    const { email, password } = req.body;
    userModel
      .findOne({ email })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({
            location: "Authentication",
            type: "Database error!",
            message: err,
          });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User not found!" });
        }
        const passwordIsValid = compareSync(
          `${email}${password}`,
          user.passwordHash
        );

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        const token = sign({ id: user.id }, secret, {
          expiresIn: 5 * 60 * 1000, // 5 minutes
        });

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
  }
}

module.exports = { AuthController };
