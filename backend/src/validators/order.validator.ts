import { z } from "zod";

export const createOrderSchema = z.object({
  productId: z.string().cuid(),
  quantity: z.number().int().positive().default(1),
  paymentMethod: z.enum(["stripe", "iyzico", "paytr", "shopier"])
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"])
});
