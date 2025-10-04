import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createNotificationSchema } from "../validators/notification.validator";
import { createNotification, listNotifications, markNotificationAsRead } from "../services/notification.service";

export async function listNotificationsHandler(req: AuthRequest, res: Response) {
  const notifications = await listNotifications(req.user?.role === "ADMIN" ? undefined : req.user?.id);
  return res.json(notifications);
}

export async function createNotificationHandler(req: AuthRequest, res: Response) {
  const data = createNotificationSchema.parse(req.body);
  const notification = await createNotification(data);
  return res.status(201).json(notification);
}

export async function markNotificationHandler(req: AuthRequest, res: Response) {
  const notification = await markNotificationAsRead(req.params.id);
  return res.json(notification);
}
