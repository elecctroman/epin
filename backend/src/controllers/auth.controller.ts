import { Response } from "express";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema, updatePasswordSchema, apiTokenSchema } from "../validators/auth.validator";
import { AuthRequest } from "../middleware/auth";
import { registerUser, validateUser, signToken, signRefreshToken, rotateApiToken } from "../services/auth.service";
import { prisma } from "../utils/prisma";

export async function registerHandler(req: AuthRequest, res: Response) {
  const body = registerSchema.parse(req.body);
  const existing = await prisma.user.findUnique({ where: { email: body.email } });
  if (existing) {
    return res.status(409).json({ message: "E-posta zaten kullanılıyor" });
  }
  const user = await registerUser(body.email, body.password);
  return res.status(201).json({ id: user.id, email: user.email });
}

export async function loginHandler(req: AuthRequest, res: Response) {
  const body = loginSchema.parse(req.body);
  const user = await validateUser(body.email, body.password);
  if (!user) {
    return res.status(401).json({ message: "Kimlik doğrulama başarısız" });
  }
  const accessToken = signToken({ id: user.id, role: user.role });
  const refreshToken = signRefreshToken({ id: user.id, role: user.role });
  return res.json({ accessToken, refreshToken });
}

export async function meHandler(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }
  const user = await prisma.user.findUnique({ where: { id: req.user.id }, include: { orders: true, apiTokens: true } });
  return res.json(user);
}

export async function updatePasswordHandler(req: AuthRequest, res: Response) {
  const body = updatePasswordSchema.parse(req.body);
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }

  const existing = await prisma.user.findUnique({ where: { id: req.user.id } });
  if (!existing) {
    return res.status(404).json({ message: "Kullanıcı bulunamadı" });
  }
  const user = await validateUser(existing.email, body.currentPassword);
  if (!user) {
    return res.status(401).json({ message: "Mevcut şifre yanlış" });
  }
  const hashed = await bcrypt.hash(body.newPassword, 12);
  await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } });

  return res.json({ message: "Şifre güncellendi" });
}


export async function createApiTokenHandler(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ message: "Kimlik doğrulaması gerekiyor" });
  }
  apiTokenSchema.parse(req.body);
  const token = await rotateApiToken(req.user.id);
  return res.status(201).json(token);
}
