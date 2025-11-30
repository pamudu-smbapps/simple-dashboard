import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env["PORT"] ?? 3001,
  jwt: {
    secret: process.env["JWT_SECRET"] ?? "secretkey",
    expiresIn: process.env["JWT_EXPIRES_IN"] ?? "7d",
  },
} as const;
