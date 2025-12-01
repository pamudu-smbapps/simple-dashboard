import { useState } from "react";
import { Checkbox, Button, Typography, Modal, Form, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useFetcher } from "react-router";
import type { Todo, UpdateTodoInput } from "../../types";

const { Text, Paragraph } = Typography;
const { TextArea } = Input;

interface TodoItemProps {
  readonly todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [form] = Form.useForm<UpdateTodoInput>();
  const fetcher = useFetcher();

  const isUpdating = fetcher.state === "submitting";

  const handleEdit = () => {
    form.setFieldsValue({
      title: todo.title,
      description: todo.description || "",
    });
    setEditOpen(true);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("intent", "update");
      formData.append("id", todo.id);
      if (values.title?.trim()) {
        formData.append("title", values.title.trim());
      }
      if (values.description?.trim()) {
        formData.append("description", values.description.trim());
      }

      fetcher.submit(formData, { method: "post" });
      setEditOpen(false);
    });
  };

  const handleToggle = (checked: boolean) => {
    const formData = new FormData();
    formData.append("intent", "update");
    formData.append("id", todo.id);
    formData.append("completed", String(checked));

    fetcher.submit(formData, { method: "post" });
  };

  const handleDelete = () => {
    const formData = new FormData();
    formData.append("intent", "delete");
    formData.append("id", todo.id);

    fetcher.submit(formData, { method: "post" });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          padding: "12px 0",
          borderBottom: "1px solid #f0f0f0",
          opacity: isUpdating ? 0.6 : 1,
        }}
      >
        <Checkbox
          checked={todo.completed}
          onChange={(e) => handleToggle(e.target.checked)}
          style={{ marginTop: 4 }}
        />
        <div style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              color: todo.completed ? "#999" : "inherit",
            }}
          >
            {todo.title}
          </Text>
          {todo.description && (
            <Paragraph
              type="secondary"
              style={{
                margin: "4px 0 0 0",
                fontSize: 12,
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.description}
            </Paragraph>
          )}
        </div>
        <Button type="text" icon={<EditOutlined />} onClick={handleEdit} />
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        />
      </div>

      <Modal
        title="Edit Todo"
        open={editOpen}
        onOk={handleUpdate}
        onCancel={() => setEditOpen(false)}
        okText="Save"
        confirmLoading={isUpdating}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
