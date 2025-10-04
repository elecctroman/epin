import { z } from "zod";

export const createTicketSchema = z.object({
  subject: z.string().min(5),
  message: z.string().min(10)
});

export const updateTicketStatusSchema = z.object({
  status: z.enum(["OPEN", "IN_PROGRESS", "RESOLVED", "CLOSED"])
});
