import { AuthRequest } from "../middlewares/auth.middleware";
import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function getProfile(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  // only owner or admin
  if (req.user.role !== "ADMIN" && req.user.id !== id) return res.status(403).json({ message: "Forbidden" });
  const user = await prisma.user.findUnique({ where: { id }, select: { id: true, username: true, email: true, address: true, role: true } });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
}

export async function updateProfile(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  if (req.user.role !== "ADMIN" && req.user.id !== id) return res.status(403).json({ message: "Forbidden" });

  const { username, email, address, password } = req.body;
  const data: any = { username, email, address };
  if (password) data.password = await bcrypt.hash(password, 10);

  const user = await prisma.user.update({ where: { id }, data });
  res.json({ id: user.id, username: user.username, email: user.email, address: user.address });
}
