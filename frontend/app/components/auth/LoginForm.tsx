import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import type { LoginCredentials } from "../../types";

interface LoginFormProps {
  readonly onSubmit: (values: LoginCredentials) => void;
  readonly loading?: boolean;
}

export function LoginForm({ onSubmit, loading }: LoginFormProps) {
  return (
    <Form
      name="login"
      onFinish={onSubmit}
      layout="vertical"
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="email"
        rules={[
          { required: true, message: "Please input your email!" },
          { type: "email", message: "Please enter a valid email!" },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
}
