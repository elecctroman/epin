import { z } from "zod";

export const createNotificationSchema = z.object({
  userId: z.string().cuid().optional(),
  type: z.string().min(3),
  message: z.string().min(3)
});
