import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/index.js";
import { User } from "../models/user.js";

export async function signup(req: Request, res: Response): Promise<void> {
  const { email, password, name } = req.body as {
    email?: string;
    password?: string;
    name?: string;
  };

  if (!email || !password || !name) {
    res.status(400).json({ error: "Email, password, and name are required" });
    return;
  }

  if (password.length < 6) {
    res
      .status(400)
      .json({ error: "Password must be at least 6 characters long" });
    return;
  }

  const existingUser = User.findByEmail(email);
  if (existingUser) {
    res.status(409).json({ error: "Email already registered" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = User.create({
    email,
    password: hashedPassword,
    name,
  });

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn } as jwt.SignOptions,
  );

  res.status(201).json({
    message: "User created successfully",
    user: user.toJSON(),
    token,
  });
}

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body as {
    email?: string;
    password?: string;
  };

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = User.findByEmail(email);
  if (!user) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: config.jwt.expiresIn } as jwt.SignOptions,
  );

  res.json({
    message: "Login successful",
    user: user.toJSON(),
    token,
  });
}
