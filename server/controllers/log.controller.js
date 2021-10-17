const winston = require("winston");
require("winston-daily-rotate-file");
class LogController {
  static logger = (() => {
    const transportLogDaily = new winston.transports.DailyRotateFile({
      filename: "log/application-%DATE%.log",
      datePattern: "YYYY-MM-DD-HH",
      zippedArchive: false,
      maxSize: "20m",
      maxFiles: "14d",
    });
    const transportConsole = new winston.transports.Console({});
    return winston.createLogger({
      transports: [transportConsole, transportLogDaily],
    });
  })();
}

module.exports = { LogController };
