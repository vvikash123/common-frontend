import winston from "winston";
require("winston-daily-rotate-file");

const { combine, timestamp, json, errors } = winston.format;
let logger = null;
// Check if we're in a Node.js environment
if (typeof window === "undefined") {
  const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: "./logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    maxFiles: "14d",
  });

  logger = winston.createLogger({
    level: "info",
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [fileRotateTransport],
    exceptionHandlers: [
      new winston.transports.File({ filename: "./logs/exception.log" }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: "./logs/rejections.log" }),
    ],
    exitOnError: false,
  });
} else {
  const logger = winston.createLogger({
    level: "info",
    format: combine(errors({ stack: true }), timestamp(), json()),
    transports: [new winston.transports.Console()],
    exceptionHandlers: [new winston.transports.Console()],
    rejectionHandlers: [new winston.transports.Console()],
    exitOnError: false,
  });
}
export { logger };
