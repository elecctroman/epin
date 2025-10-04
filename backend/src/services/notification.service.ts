import { prisma } from "../utils/prisma";

export function createNotification(data: { userId?: string; type: string; message: string }) {
  return prisma.notification.create({ data });
}

export function listNotifications(userId?: string) {
  return prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" } });
}

export function markNotificationAsRead(id: string) {
  return prisma.notification.update({ where: { id }, data: { isRead: true } });
}
