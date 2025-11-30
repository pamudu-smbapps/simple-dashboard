import { Router } from "express";
import authRoutes from "./auth.js";
import todoRoutes from "./todo.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/todo", todoRoutes);

export default router;
