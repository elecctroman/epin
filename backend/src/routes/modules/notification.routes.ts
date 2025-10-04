import { Router } from "express";
import { authenticate, authorize } from "../../middleware/auth";
import {
  createNotificationHandler,
  listNotificationsHandler,
  markNotificationHandler
} from "../../controllers/notification.controller";

const router = Router();

router.get("/", authenticate, listNotificationsHandler);
router.post("/", authenticate, authorize(["ADMIN"]), createNotificationHandler);
router.post("/:id/read", authenticate, markNotificationHandler);

export default router;
