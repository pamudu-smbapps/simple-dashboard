import { Router } from "express";
import {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
