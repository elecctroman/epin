import { Response } from "express";
import { AuthRequest } from "../middleware/auth";
import { listUsers, updateUserRole, banUser } from "../services/user.service";

export async function listUsersHandler(_req: AuthRequest, res: Response) {
  const users = await listUsers();
  return res.json(users);
}

export async function updateUserRoleHandler(req: AuthRequest, res: Response) {
  const { role } = req.body;
  if (!role) {
    return res.status(400).json({ message: "Rol belirtilmelidir" });
  }
  const user = await updateUserRole(req.params.id, role);
  return res.json(user);
}

export async function banUserHandler(req: AuthRequest, res: Response) {
  const user = await banUser(req.params.id);
  return res.json(user);
}
