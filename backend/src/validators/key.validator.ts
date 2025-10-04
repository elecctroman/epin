import { z } from "zod";

export const createKeySchema = z.object({
  productId: z.string().cuid(),
  code: z.string().min(6)
});

export const bulkUploadSchema = z.object({
  productId: z.string().cuid(),
  codes: z.array(z.string().min(6)).min(1)
});
