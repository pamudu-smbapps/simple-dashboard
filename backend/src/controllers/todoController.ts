import type { Request, Response } from "express";
import { Todo } from "../models/todo.js";

export function getAllTodos(req: Request, res: Response): void {
  const todos = Todo.findAllByUserId(req.user!.userId);

  res.json({ data: todos.map((t) => t.toJSON()) });
}

export function getTodoById(req: Request, res: Response): void {
  const { id } = req.params;
  const todo = Todo.findById(id!);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  if (todo.userId !== req.user!.userId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  res.json(todo.toJSON());
}

export function createTodo(req: Request, res: Response): void {
  const { title, description } = req.body as {
    title?: string;
    description?: string;
  };

  if (!title) {
    res.status(400).json({ error: "Title is required" });
    return;
  }

  const todo = Todo.create({
    userId: req.user!.userId,
    title,
    description,
  });

  res.status(201).json({ message: "Todo created", data: todo.toJSON() });
}

export function updateTodo(req: Request, res: Response): void {
  const { id } = req.params;
  const { title, description, completed } = req.body as {
    title?: string;
    description?: string;
    completed?: boolean;
  };

  const todo = Todo.findById(id!);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  if (todo.userId !== req.user!.userId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  todo.update({ title, description, completed });

  res.json({ message: "Todo updated", data: todo.toJSON() });
}

export function deleteTodo(req: Request, res: Response): void {
  const { id } = req.params;

  const todo = Todo.findById(id!);

  if (!todo) {
    res.status(404).json({ error: "Todo not found" });
    return;
  }

  if (todo.userId !== req.user!.userId) {
    res.status(403).json({ error: "Access denied" });
    return;
  }

  todo.delete();

  res.json({ message: "Todo deleted" });
}
