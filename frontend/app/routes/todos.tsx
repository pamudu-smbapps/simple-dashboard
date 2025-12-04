import { Card, Typography, Empty, Alert } from "antd";
import {
  redirect,
  useLoaderData,
  useActionData,
  useNavigation,
} from "react-router";
import { todoService } from "../services/todoService";
import { AddTodo } from "../components/todo/AddTodo";
import { TodoItem } from "../components/todo/TodoItem";
import { AppLayout } from "../components/AppLayout";
import type { Route } from "./+types/todos";
import type { Todo } from "../types";

const { Title } = Typography;

export async function clientLoader() {
  const token = localStorage.getItem("token");
  if (!token) {
    throw redirect("/login");
  }

  try {
    const todos = await todoService.getAll();
    return { todos, error: null };
  } catch {
    return { todos: [], error: "Failed to load todos" };
  }
}

export async function clientAction({ request }: Route.ClientActionArgs) {
  const formData = await request.formData();
  const intent = formData.get("intent") as string;

  try {
    switch (intent) {
      case "create": {
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        await todoService.create({
          title,
          description: description || undefined,
        });
        return { success: true, error: null };
      }
      case "update": {
        const id = formData.get("id") as string;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const completed = formData.get("completed");
        await todoService.update(id, {
          title: title || undefined,
          description: description || undefined,
          completed: completed !== null ? completed === "true" : undefined,
        });
        return { success: true, error: null };
      }
      case "delete": {
        const id = formData.get("id") as string;
        await todoService.delete(id);
        return { success: true, error: null };
      }
      default:
        return { success: false, error: "Invalid action" };
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Action failed",
    };
  }
}

export default function Todos() {
  const { todos, error: loaderError } = useLoaderData<typeof clientLoader>();
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  return (
    <AppLayout>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <Card variant="borderless" className="shadow-sm">
          <Title level={4} style={{ marginBottom: 24 }}>
            My Todos
          </Title>

          {loaderError && (
            <Alert
              message={loaderError}
              type="error"
              closable
              style={{ marginBottom: 16 }}
            />
          )}

          {actionData?.error && (
            <Alert
              message={actionData.error}
              type="error"
              closable
              style={{ marginBottom: 16 }}
            />
          )}

          <AddTodo />

          <div style={{ marginTop: 24, opacity: isLoading ? 0.6 : 1 }}>
            {todos.length === 0 ? (
              <Empty description="No todos yet" />
            ) : (
              todos.map((todo: Todo) => <TodoItem key={todo.id} todo={todo} />)
            )}
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
