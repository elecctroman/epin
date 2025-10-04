import { prisma } from "../utils/prisma";

export function createTicket(userId: string, subject: string, message: string) {
  return prisma.ticket.create({ data: { userId, subject, message } });
}

export function listTickets() {
  return prisma.ticket.findMany({ include: { user: true } });
}

export function updateTicketStatus(ticketId: string, status: "OPEN" | "IN_PROGRESS" | "RESOLVED" | "CLOSED") {
  return prisma.ticket.update({ where: { id: ticketId }, data: { status } });
}
