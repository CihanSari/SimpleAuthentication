const { secret } = require("../config/auth.config");
const { userModel, roleModel } = require("../models");
const { LogController } = require("./log.controller");

const { sign } = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

class AuthController {
  static async register(req, res) {
    try {
      const { username, email } = req.body;
      if (username == null || email == null || req.body.password == null) {
        res
          .status(406)
          .send({ message: "Missing username, email or password" });
        return;
      }
      const password = hashSync(`${username}${req.body.password}`, 10);
      console.log(username, req.body.password, password);
      LogController.logger.info(
        `Registering user: ${username} with email: ${email}...`
      );
      const user = new userModel({
        username,
        email,
        password,
      });
      await user.save();
      if (req.body.roles) {
        roleModel.find(
          {
            name: { $in: req.body.roles },
          },
          async (err, roles) => {
            if (err) {
              res.status(500).send({ message: err });
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
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      }
    } catch (err) {
      res.status(500).send({
        location: "auth controller",
        type: "Database error!",
        message: err,
      });
    }
  }

  static login(req, res) {
    const { username } = req.body;
    userModel
      .findOne({ username })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }
        const password = `${username}${req.body.password}`;
        const passwordIsValid = compareSync(password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        const token = sign({ id: user.id }, secret, {
          expiresIn: 86400, // 24 hours
        });

        let authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
  }
}

module.exports = { AuthController };
