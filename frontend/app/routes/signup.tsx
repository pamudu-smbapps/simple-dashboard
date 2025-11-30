import { useEffect } from "react";
import { Card, Typography, message } from "antd";
import { useNavigate, Link } from "react-router";
import { SignupForm } from "../components/auth/SignupForm";
import { useAuth } from "../hooks/useAuth";
import type { SignupCredentials } from "../types";

const { Title, Text } = Typography;

export default function Signup() {
  const navigate = useNavigate();
  const { signup, isAuthenticated, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const onFinish = async (values: SignupCredentials) => {
    try {
      await signup(values);
      message.success("Signup successful!");
      navigate("/");
    } catch {
      message.error("Signup failed. Please try again.");
    }
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

        <SignupForm onSubmit={onFinish} loading={loading} />

        <div className="text-center">
          <Text>
            Already have an account? <Link to="/login">Log in</Link>
          </Text>
        </div>
      </Card>
    </div>
  );
}
