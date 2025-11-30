import { useEffect } from "react";
import { Card, Typography, message } from "antd";
import { useNavigate, Link } from "react-router";
import { LoginForm } from "../components/auth/LoginForm";
import { useAuth } from "../hooks/useAuth";
import type { LoginCredentials } from "../types";

const { Title, Text } = Typography;

export default function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: LoginCredentials) => {
    try {
      await login(values);
      message.success("Login successful!");
      navigate("/");
    } catch {
      message.error("Invalid email or password");
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

        <LoginForm onSubmit={onFinish} loading={loading} />

        <div className="text-center">
          <Text>
            Don&apos;t have an account? <Link to="/signup">Sign up</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
