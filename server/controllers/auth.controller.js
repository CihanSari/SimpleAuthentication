const { secret } = require("../config/auth.config");
const { userModel, roleModel } = require("../models");

const { sign } = require("jsonwebtoken");
const { hashSync, compareSync } = require("bcryptjs");

class AuthController {
  static async register(req, res) {
    try {
      const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: hashSync(req.body.password, 8),
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
      res
        .status(500)
        .send({ location: "auth controller", type: "Database error!", message: err });
    }
  }

  static login(req, res) {
    userModel
      .findOne({
        username: req.body.username,
      })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return res.status(404).send({ message: "User Not found." });
        }

        const passwordIsValid = compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
          return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        const token = sign({ id: user.id }, config.secret, {
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
