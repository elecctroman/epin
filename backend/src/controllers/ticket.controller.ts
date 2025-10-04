import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { createTicketSchema, updateTicketStatusSchema } from "../validators/ticket.validator";
import { createTicket, listTickets, updateTicketStatus } from "../services/ticket.service";

export async function listTicketsHandler(_req: AuthRequest, res: Response) {
  const tickets = await listTickets();
  return res.json(tickets);
}

export async function createTicketHandler(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }
  const data = createTicketSchema.parse(req.body);
  const ticket = await createTicket(req.user.id, data.subject, data.message);
  return res.status(201).json(ticket);
}

export async function updateTicketStatusHandler(req: AuthRequest, res: Response) {
  const data = updateTicketStatusSchema.parse(req.body);
  const ticket = await updateTicketStatus(req.params.id, data.status);
  return res.json(ticket);
}
