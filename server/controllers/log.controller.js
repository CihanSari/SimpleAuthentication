const { transports, createLogger } = require("winston");
require("winston-daily-rotate-file");
const { join } = require("path");
const { LOG_PATH } = require("../config/server.config");
class LogController {
  static logger = (() => {
    const transportLogDaily = new transports.DailyRotateFile({
      filename: join(LOG_PATH, "application-%DATE%.log"),
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    });
    const transportConsole = new transports.Console({});
    return createLogger({
      transports: [transportConsole, transportLogDaily],
    });
  })();
}

module.exports = { LogController };
