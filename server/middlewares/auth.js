const { userModel, roleModel } = require("../models");
const { verify } = require("jsonwebtoken");
const { secret } = require("../config/auth.config.js");

async function findRole(userRoles, queryRole) {
  return new Promise((res, rej) => {
    roleModel.find(
      {
        _id: { $in: userRoles },
      },
      (err, roles) => {
        if (err) {
          rej(err);
          return;
        }

        for (let i = 0; i < roles.length; i++) {
          if (roles[i].name === queryRole) {
            res(true);
            return;
          }
        }
        res(false);
        return;
      }
    );
  });
}

class AuthMW {
  static verifyToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(406).send({ message: "No token provided!" });
    }

    verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }
  static async isAdmin(req, res, next) {
    try {
      const user = await userModel.findById(req.userId).exec();
      const roleFound = await findRole(user.roles, "admin");
      if (roleFound) {
        next();
      } else {
        res.status(403).send({ message: "Requires Admin Role!" });
      }
    } catch (err) {
      res
        .status(500)
        .send({ location: "auth", type: "Database error!", message: err });
    }
  }
  static async isModerator(req, res, next) {
    try {
      const user = await userModel.findById(req.userId).exec();
      const roleFound = await findRole(user.roles, "moderator");
      if (roleFound) {
        next();
      } else {
        res.status(403).send({ message: "Requires Moderator Role!" });
      }
    } catch (err) {
      res
        .status(500)
        .send({ location: "auth", type: "Database error!", message: err });
    }
  }
}

module.exports = { AuthMW };
