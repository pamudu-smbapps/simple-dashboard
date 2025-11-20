import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router";

const { Title, Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

type UserType = {
  username?: string;
  password?: string;
  fullName?: string;
};

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const onFinish = (values: FieldType) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u: UserType) =>
        u.username === values.username && u.password === values.password,
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      message.success("Login successful!");
      navigate("/");
    } else {
      message.error("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg" variant="borderless">
        <div className="text-center mb-8">
          <Title level={2} style={{ marginBottom: 0 }}>
            Welcome Back
          </Title>
          <Text type="secondary">Please sign in to your account</Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Log in
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text>
              Don&apos;t have an account? <Link to="/signup">Sign up</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
