const { UserModel } = require("../models");
const { verify } = require("jsonwebtoken");
const { authSecret, resetSecret } = require("../config/auth.config.js");

async function findRole(userRoles, queryRole) {
  const found = await userRoles.find((e) => e == queryRole.toUpperCase());
  return found != null;
}

class AuthMW {
  static verifyAuthToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(406).send({ message: "No token provided!" });
    }

    verify(token, authSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }

  static verifyResetToken(req, res, next) {
    const token = req.headers["x-access-token"];
    if (!token) {
      return res.status(406).send({ message: "No token provided!" });
    }

    verify(token, resetSecret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized!" });
      }
      req.userId = decoded.id;
      next();
    });
  }

  static async hasRole(id, role, res, next) {
    try {
      const user = await UserModel.users.findOne({
        where: { id },
      });
      const roleFound = await findRole(user.roles, role);
      if (roleFound) {
        next();
      } else {
        res.status(403).send({ message: `Requires ${role} Role!` });
      }
    } catch (err) {
      res
        .status(500)
        .send({ location: "auth", type: "Database error!", message: err });
    }
  }

  static async isAdmin(req, res, next) {
    AuthMW.hasRole(req.userId, "ADMIN", res, next);
  }

  static async isModerator(req, res, next) {
    AuthMW.hasRole(req.userId, "MODERATOR", res, next);
  }
}

module.exports = { AuthMW };
