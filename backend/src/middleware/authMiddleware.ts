import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import type { JwtPayload } from "../types/index.js";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.slice(7);

  try {
    const decoded = jwt.verify(token, config.jwt.secret) as JwtPayload;
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
