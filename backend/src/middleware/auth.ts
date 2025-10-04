import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "USER" | "ADMIN";
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Yetkilendirme başlığı bulunamadı" });
  }
  const token = authHeader.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AuthRequest["user"];
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token" });
  }
}

export function authorize(roles: Array<"USER" | "ADMIN"> = ["USER", "ADMIN"]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Bu işlem için yetkiniz yok" });
    }
    next();
  };
}
