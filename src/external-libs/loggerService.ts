/* eslint-disable no-dupe-class-members */
/* eslint-disable camelcase */
import { createLogger, transports, format } from "winston";
​
class LoggerService {
  log_data: any
  logger: any
  route: any 
  constructor(route : any) {
    this.log_data = null;
    this.route = route || "app";
    const logger = createLogger({
      transports: [
        new transports.Console(),
        new transports.File({
          filename: `./logs/${route}.log`,
        }),
      ],
      format: format.combine(
        format.timestamp({
          format: "YYYYMMDD-HH:mm:ss:SSS",
        }),
        format.errors({ stack: true }),
        format.splat(),
        format.json(),
        format.printf((info) => {
          let message = `[${info.timestamp}] | ${route}.log | ${info.level} | ${info.message}`;
          message = info.obj
            ? message + ` | data:${JSON.stringify(info.obj)}`
            : message;
          message = this.log_data
            ? message + ` | log_data:${JSON.stringify(this.log_data)}`
            : message;
          return message;
        })
      ),
    });
    this.logger = logger;
  }
​
  setLogData(log_data : any) {
    this.log_data = log_data;
  }
​
  async info(message : string) {
    this.logger.log("info", message);
  }
​
  async info(message : string, obj : object) {
    this.logger.log("info", message, {
      obj,
    });
  }
​
  async debug(message : string) {
    this.logger.log("debug", message);
  }
​
  async debug(message : string, obj : object) {
    this.logger.log("debug", message, {
      obj,
    });
  }
​
  // async error(message) {
  //   this.logger.log("error", message);
  // }
​
  // async error(message, obj) {
  //   this.logger.log("error", message, {
  //     obj
  //   });
  // }
​
  async warn(message : string) {
    this.logger.log("warn", message);
  }
​
  async warn(message : string, obj) {
    this.logger.log("warn", message, {
      obj,
    });
  }
​
  async error(error, additionalData) {
    let message = error;
    // Error-like
    if (error && error.message && error.stack) {
      message = [error.message, "---", JSON.stringify(error.stack)].join("\n");
    }
​
    if (typeof message !== "string") {
      message = JSON.stringify(error);
    }
​
    if (additionalData) {
      message = [message, "---", JSON.stringify(additionalData)].join("\n");
    }
    return this.logger.error(["###", message, "###"].join("\n"));
  }
}
​
module.exports = LoggerService;