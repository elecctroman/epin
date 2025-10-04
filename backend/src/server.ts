import cors from "cors";
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import csrf from "csurf";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { router } from "./routes";
import { swaggerSpec } from "./utils/swagger";

export function createServer() {
  const app = express();

  app.use(helmet());
  app.use("/api/payment/webhook", express.raw({ type: "application/json" }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    cors({
      origin: env.FRONTEND_URL ?? true,
      credentials: true
    })
  );

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false
  });
  app.use(limiter);

  const csrfProtection = csrf({ cookie: true });
  app.use((req, res, next) => {
    if (req.path.startsWith("/api/payment/webhook")) {
      return next();
    }
    return csrfProtection(req, res, next);
  });

  app.use((req, res, next) => {
    logger.info(`${req.method} ${req.path}`);
    next();
  });

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", router);

  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    logger.error(err);
    const status = err.status ?? 500;
    res.status(status).json({ message: err.message ?? "Internal Server Error" });
  });

  return app;
}
