const { LogController } = require("./log.controller");
const session = require("express-session");
const Keycloak = require("keycloak-connect");
const keycloakConfig = require("../config/keycloak.config");

let _keycloak;

class KeycloakController {
  static init() {
    if (_keycloak) {
      LogController.logger.warn("Trying to init Keycloak again!");
      return _keycloak;
    } else {
      LogController.logger.info("Initializing Keycloak...");
      const memoryStore = new session.MemoryStore();
      _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
      return _keycloak;
    }
  }

  static get() {
    if (!_keycloak) {
      LogController.logger.error(
        "Keycloak has not been initialized. Please called init first."
      );
    }
    return _keycloak;
  }

//   login(username, password) {
//     fetch(
//       `${keycloakConfig.serverUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//         body: `grant_type=password&client_id=${keycloakConfig.clientId}&client_secret=${keycloakConfig.credentials.secret}&username=${username}&password=${password}`,
//       }
//     );
//   }
}

module.exports = { KeycloakController };
