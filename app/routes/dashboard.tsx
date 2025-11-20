import React, { useEffect, useState } from "react";
import {
  Layout,
  Menu,
  Typography,
  Button,
  Card,
  Statistic,
  Row,
  Col,
  Avatar,
  Space,
  Table,
  Tag,
  theme,
} from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  RiseOutlined,
  DollarOutlined,
  ShoppingOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

interface User {
  fullName?: string;
  username?: string;
}

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
  const [user, setUser] = useState<User | null>(null);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
      setUser(JSON.parse(currentUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <Layout className="min-h-screen!">
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        style={{ background: "#001529" }}
        width={250}
      >
        <div className="h-16 m-4 flex items-center justify-center">
          <Title level={4} style={{ color: "white", margin: 0 }}>
            Simple Dashboard
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "2",
              icon: <TeamOutlined />,
              label: "Users",
            },
            {
              key: "3",
              icon: <ShoppingOutlined />,
              label: "Orders",
            },
            {
              key: "4",
              icon: <UserOutlined />,
              label: "Profile",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            justifyContent: "right",
            alignItems: "center",
          }}
        >
          <Space size="large">
            <Button type="text" icon={<BellOutlined />} />
            <Space>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <div className="hidden md:block">
                <Text strong>{user.fullName}</Text>
              </div>
            </Space>
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
              danger
            >
              Logout
            </Button>
          </Space>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{ padding: 24, minHeight: 360, background: "transparent" }}
          >
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
        </Content>
      </Layout>
    </Layout>
  );
}
