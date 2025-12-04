import api from "./api";
import type {
  Todo,
  CreateTodoInput,
  UpdateTodoInput,
  TodoStats,
  TodoListResponse,
  TodoResponse,
  TodoDeleteResponse,
} from "../types";

export const todoService = {
  async getAll(): Promise<Todo[]> {
    const { data } = await api.get<TodoListResponse>("/todo");
    return data.data;
  },

  async create(input: CreateTodoInput): Promise<Todo> {
    const { data } = await api.post<TodoResponse>("/todo", input);
    return data.data;
  },

  async update(id: string, input: UpdateTodoInput): Promise<Todo> {
    const { data } = await api.put<TodoResponse>(`/todo/${id}`, input);
    return data.data;
  },

  async delete(id: string): Promise<string> {
    const { data } = await api.delete<TodoDeleteResponse>(`/todo/${id}`);
    return data.message;
  },

  async getStats(): Promise<TodoStats> {
    const { data } = await api.get<{ data: TodoStats }>(`/todo/stats`);
    return data.data;
  },
};
