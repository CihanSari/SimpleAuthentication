const { userModel, roleModel } = require("../models");
const { verify } = require("jsonwebtoken");
const { secret } = require("../config/auth.config.js");

class AuthMW {
  static verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }

    verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }
  static isAdmin(req, res, next) {
    userModel.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      roleModel.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "admin") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Admin Role!" });
          return;
        }
      );
    });
  }
  static isModerator(req, res, next) {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      roleModel.find(
        {
          _id: { $in: user.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "moderator") {
              next();
              return;
            }
          }

          res.status(403).send({ message: "Require Moderator Role!" });
          return;
        }
      );
    });
  }
}

module.exports = { AuthMW };
