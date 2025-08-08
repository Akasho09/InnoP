import { Response, NextFunction } from "express";
import { AuthRequest } from "./auth.middleware";

export function permit(...allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!allowedRoles.includes(user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}
