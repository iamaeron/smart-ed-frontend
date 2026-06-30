import { Card, Center, Grid, Text } from "@mantine/core";
import RecentActivity from "@/components/dashboard/recent-activity";
import ComparativeEnrollment from "@/components/dashboard/comparative-enrollment";
import EnrollmentByGender from "@/components/dashboard/enrollment-by-gender";
import NotificationsCol from "@/components/dashboard/notifications-col";
import AppLayout from "@/layouts/app.layout";
import DashboardResourceSummary from "@/components/dashboard/dashboard-resource-summary";
import QuickOverviewCols from "@/components/dashboard/quick-overview-cols";

const SystemAdminDashboard = () => {
  return (
    <AppLayout>
      <QuickOverviewCols />

      <Grid mt={20}>
        <Grid.Col span={9}>
          <Grid>
            <Grid.Col span={4}>
              <EnrollmentByGender />
            </Grid.Col>
            <Grid.Col span={8}>
              <Card mah="400" radius="lg" p="lg" shadow="sm">
                <Text mb={14} fw={600}>
                  Comparative Enrollment
                </Text>

                <Center>
                  <ComparativeEnrollment />
                </Center>
              </Card>
            </Grid.Col>
            <Grid.Col span={12}>
              <DashboardResourceSummary />
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* 2nd row */}
        <Grid.Col span={3}>
          <Grid>
            <Grid.Col span={12}>
              <NotificationsCol />
            </Grid.Col>
            <Grid.Col span={12}>
              <RecentActivity />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default SystemAdminDashboard;
