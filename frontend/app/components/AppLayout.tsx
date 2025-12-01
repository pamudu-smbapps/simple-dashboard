import type { ReactNode } from "react";
import { Layout, Menu, Typography, Button, Avatar, Space, theme } from "antd";
import {
  UserOutlined,
  DashboardOutlined,
  LogoutOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import { useNavigate, Link, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;

interface AppLayoutProps {
  readonly children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getSelectedKey = () => {
    if (location.pathname === "/todos") return "2";
    return "1";
  };

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
            Simple Todo
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[getSelectedKey()]}
          items={[
            {
              key: "1",
              icon: <DashboardOutlined />,
              label: <Link to="/">Dashboard</Link>,
            },
            {
              key: "2",
              icon: <CheckSquareOutlined />,
              label: <Link to="/todos">Todos</Link>,
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
            <Space>
              <Avatar
                style={{ backgroundColor: "#87d068" }}
                icon={<UserOutlined />}
              />
              <div className="hidden md:block">
                <Text strong>{user?.name}</Text>
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
        <Content style={{ margin: "24px 16px 0" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}
