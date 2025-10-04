import { Response } from "express";
import multer from "multer";
import { AuthRequest } from "../middleware/auth";
import { bulkUploadSchema, createKeySchema } from "../validators/key.validator";
import { addKey, bulkAddKeys, listKeys, softDeleteKey } from "../services/key.service";

const upload = multer({ storage: multer.memoryStorage() });

export const csvUploadMiddleware = upload.single("file");

export async function listKeysHandler(req: AuthRequest, res: Response) {
  const keys = await listKeys(req.params.productId);
  return res.json(keys);
}

export async function createKeyHandler(req: AuthRequest, res: Response) {
  const data = createKeySchema.parse(req.body);
  const key = await addKey(data.productId, data.code);
  return res.status(201).json(key);
}

export async function bulkUploadHandler(req: AuthRequest, res: Response) {
  const payload = req.file
    ? req.file.buffer.toString("utf-8").split(/?
/).filter(Boolean)
    : Array.isArray(req.body.codes)
    ? req.body.codes
    : (req.body.codes ?? "").split(/?
/).filter(Boolean);
  const body = bulkUploadSchema.parse({
    productId: req.body.productId,
    codes: payload
  });
  const result = await bulkAddKeys(body.productId, body.codes);
  return res.status(201).json(result);
}

export async function deleteKeyHandler(req: AuthRequest, res: Response) {
  await softDeleteKey(req.params.id);
  return res.status(204).send();
}
