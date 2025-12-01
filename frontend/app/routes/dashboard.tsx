import { useEffect } from "react";
import {
  Card,
  Statistic,
  Row,
  Col,
  Space,
  Table,
  Tag,
  Typography,
  Avatar,
} from "antd";
import {
  UserOutlined,
  TeamOutlined,
  RiseOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { AppLayout } from "../components/AppLayout";

const { Text } = Typography;

const recentActivityData = [
  {
    key: "1",
    action: "New User Signup",
    user: "John Doe",
    status: "completed",
    time: "2 mins ago",
  },
  {
    key: "2",
    action: "Purchase",
    user: "Alice Smith",
    status: "processing",
    time: "15 mins ago",
  },
  {
    key: "3",
    action: "Login Attempt",
    user: "Bob Johnson",
    status: "failed",
    time: "1 hour ago",
  },
];

const columns = [
  {
    title: "User",
    dataIndex: "user",
    key: "user",
    render: (text: string) => (
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        {text}
      </Space>
    ),
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
      let color = "green";
      if (status === "processing") color = "blue";
      if (status === "failed") color = "red";
      return <Tag color={color}>{status.toUpperCase()}</Tag>;
    },
  },
  {
    title: "Time",
    dataIndex: "time",
    key: "time",
    render: (text: string) => <Text type="secondary">{text}</Text>,
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  return (
    <AppLayout>
      <div style={{ padding: 24, minHeight: 360, background: "transparent" }}>
        <Row gutter={[16, 16]} className="mb-6">
          <Col xs={24} sm={8}>
            <Card
              variant="borderless"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Total Sales"
                value={112893}
                precision={2}
                valueStyle={{ color: "#3f8600" }}
                prefix={<DollarOutlined />}
                suffix=""
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              variant="borderless"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Active Users"
                value={2456}
                prefix={<TeamOutlined />}
                valueStyle={{ color: "#1677ff" }}
              />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card
              variant="borderless"
              className="shadow-sm hover:shadow-md transition-shadow"
            >
              <Statistic
                title="Growth Rate"
                value={15.4}
                precision={1}
                valueStyle={{ color: "#cf1322" }}
                prefix={<RiseOutlined />}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <Card
          title="Recent Activity"
          variant="borderless"
          className="shadow-sm"
        >
          <Table
            columns={columns}
            dataSource={recentActivityData}
            pagination={false}
            size="middle"
          />
        </Card>
      </div>
    </AppLayout>
  );
}
