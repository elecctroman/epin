import { env } from "./config/env";
import { logger } from "./config/logger";
import { createServer } from "./server";

const app = createServer();

app.listen(env.PORT, () => {
  logger.info(`🚀 API server listening on port ${env.PORT}`);
});
