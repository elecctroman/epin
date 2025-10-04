import { prisma } from "../utils/prisma";

export function listUsers() {
  return prisma.user.findMany({
    include: {
      orders: true,
      tickets: true
    }
  });
}

export function updateUserRole(userId: string, role: "USER" | "ADMIN") {
  return prisma.user.update({ where: { id: userId }, data: { role } });
}

export function banUser(userId: string) {
  return prisma.user.update({ where: { id: userId }, data: { role: "USER", emailVerified: null } });
}
