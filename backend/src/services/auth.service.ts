import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";
import { prisma } from "../utils/prisma";
import { env } from "../config/env";

export async function registerUser(email: string, password: string) {
  const hashed = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, password: hashed }
  });
  return user;
}

export async function validateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return null;
  return user;
}

export function signToken(user: { id: string; role: string }) {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "15m" });
}

export function signRefreshToken(user: { id: string; role: string }) {
  return jwt.sign({ id: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "7d" });
}

export async function rotateApiToken(userId: string, ttlHours = 24) {
  const token = nanoid(32);
  const expiresAt = new Date(Date.now() + ttlHours * 60 * 60 * 1000);
  const apiToken = await prisma.apiToken.create({
    data: { token, userId, expiresAt }
  });
  return apiToken;
}
