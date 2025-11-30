import type {
  TodoAttributes,
  TodoCreationAttributes,
  TodoUpdateAttributes,
} from "../types/index.js";
import { generateId } from "../utils/helpers.js";

const todos = new Array<Todo>();

export class Todo {
  public id: string;
  public userId: string;
  public title: string;
  public description?: string;
  public completed: boolean;
  public createdAt: Date;
  public updatedAt: Date;

  constructor(attributes: TodoAttributes) {
    this.id = attributes.id;
    this.userId = attributes.userId;
    this.title = attributes.title;
    this.description = attributes.description;
    this.completed = attributes.completed;
    this.createdAt = attributes.createdAt;
    this.updatedAt = attributes.updatedAt;
  }

  update(data: TodoUpdateAttributes): this {
    if (data.title !== undefined) this.title = data.title;
    if (data.description !== undefined) this.description = data.description;
    if (data.completed !== undefined) this.completed = data.completed;
    this.updatedAt = new Date();
    return this;
  }

  delete(): boolean {
    const index = todos.findIndex((t) => t.id === this.id);
    if (index === -1) return false;
    todos.splice(index, 1);
    return true;
  }

  toJSON(): TodoAttributes {
    return {
      id: this.id,
      userId: this.userId,
      title: this.title,
      description: this.description,
      completed: this.completed,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static findById(id: string): Todo | null {
    return todos.find((t) => t.id === id) ?? null;
  }

  static findAllByUserId(userId: string): Todo[] {
    return todos.filter((t) => t.userId === userId);
  }

  static create(data: TodoCreationAttributes): Todo {
    const todo = new Todo({
      id: generateId(),
      userId: data.userId,
      title: data.title,
      description: data.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    todos.push(todo);
    return todo;
  }
}
