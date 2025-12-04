import { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router";
import { Card, Statistic, Row, Col, List } from "antd";
import { AppLayout } from "../components/AppLayout";
import { useAuth } from "../hooks/useAuth";
import { todoService } from "../services/todoService";

export async function clientLoader() {
  return await todoService.getStats();
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const stats = useLoaderData<typeof clientLoader>();

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
            <Card className="shadow-sm">
              <Statistic title="Total Todos" value={stats?.total ?? 0} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="shadow-sm">
              <Statistic title="Completed" value={stats?.completed ?? 0} />
            </Card>
          </Col>
          <Col xs={24} sm={8}>
            <Card className="shadow-sm">
              <Statistic title="Pending" value={stats?.pending ?? 0} />
            </Card>
          </Col>
        </Row>

        <Card title="Newest Todos" className="shadow-sm">
          <List
            dataSource={stats?.newest ?? []}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={item.title}
                  description={new Date(item.createdAt).toLocaleString()}
                />
              </List.Item>
            )}
          />
        </Card>
      </div>
    </AppLayout>
  );
}
