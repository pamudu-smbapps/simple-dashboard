import { useState } from "react";
import { Input, Button, Modal, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useFetcher } from "react-router";
import type { CreateTodoInput } from "../../types";

const { TextArea } = Input;

export function AddTodo() {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<CreateTodoInput>();
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const formData = new FormData();
      formData.append("intent", "create");
      formData.append("title", values.title.trim());
      if (values.description?.trim()) {
        formData.append("description", values.description.trim());
      }

      fetcher.submit(formData, { method: "post" });
      form.resetFields();
      setOpen(false);
    });
  };

  return (
    <>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setOpen(true)}
        size="large"
        block
      >
        Add Todo
      </Button>

      <Modal
        title="Add New Todo"
        open={open}
        onOk={handleSubmit}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
        okText="Add"
        confirmLoading={isSubmitting}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="Title"
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="What needs to be done?" />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea placeholder="Add more details (optional)" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
