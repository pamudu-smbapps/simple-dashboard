import React, { useEffect } from "react";
import { Form, Input, Button, Card, Typography, message } from "antd";
import { UserOutlined, LockOutlined, IdcardOutlined } from "@ant-design/icons";
import { useNavigate, Link } from "react-router";

const { Title, Text } = Typography;

type UserType = {
  fullName?: string;
  username?: string;
  password?: string;
};

export default function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const onFinish = (values: UserType) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const userExists = users.find(
      (u: UserType) => u.username === values.username,
    );

    if (userExists) {
      message.error("Username already exists!");
      return;
    }

    users.push(values);
    localStorage.setItem("users", JSON.stringify(users));
    message.success("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-lg" variant="borderless">
        <div className="text-center mb-8">
          <Title level={2} style={{ marginBottom: 0 }}>
            Create Account
          </Title>
          <Text type="secondary">Sign up to get started</Text>
        </div>

        <Form name="signup" onFinish={onFinish} layout="vertical" size="large">
          <Form.Item
            name="fullName"
            rules={[
              { required: true, message: "Please input your full name!" },
            ]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="Full Name" />
          </Form.Item>

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
              Sign Up
            </Button>
          </Form.Item>

          <div className="text-center">
            <Text>
              Already have an account? <Link to="/login">Log in</Link>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
}
