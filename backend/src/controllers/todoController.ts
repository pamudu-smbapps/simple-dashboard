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

export function getTodoStats(req: Request, res: Response): void {
  const todos = Todo.findAllByUserId(req.user!.userId);

  const total = todos.length;
  const completed = todos.filter((t) => t.completed).length;
  const pending = total - completed;

  const newest = todos
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 3)
    .map((t) => t.toJSON());

  res.json({ data: { total, completed, pending, newest } });
}
