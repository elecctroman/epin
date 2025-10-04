import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().min(3),
  category: z.string().min(2),
  price: z.number().positive(),
  description: z.string().min(10),
  image: z.string().url().optional()
});

export const updateProductSchema = createProductSchema.partial();
