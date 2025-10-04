import winston from "winston";

const { combine, timestamp, printf, colorize, errors } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize(),
    timestamp(),
    errors({ stack: true }),
    printf(({ level, message, timestamp: ts, stack }) => `${ts} [${level}]: ${stack ?? message}`)
  ),
  transports: [new winston.transports.Console()]
});
