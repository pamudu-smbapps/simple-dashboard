import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import type { SignupCredentials } from "../../types";

interface SignupFormProps {
  readonly onSubmit: (values: SignupCredentials) => void;
  readonly loading?: boolean;
}

export function SignupForm({ onSubmit, loading }: SignupFormProps) {
  return (
    <Form
      name="signup"
      onFinish={onSubmit}
      layout="vertical"
      size="large"
      autoComplete="off"
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input prefix={<IdcardOutlined />} placeholder="Full Name" />
      </Form.Item>

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
        rules={[
          { required: true, message: "Please input your password!" },
          { min: 6, message: "Password must be at least 6 characters!" },
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder="Password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
          Sign Up
        </Button>
      </Form.Item>
    </Form>
  );
}
