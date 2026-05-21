import QuickViewCol from "@/components/dashboard/quick-view-col";
import QuickViewContainer from "@/components/dashboard/quick-view-container";
import { Card, Center, Grid, Text } from "@mantine/core";
import { Buildings, SquareAcademicCap, UserHandUp } from "@solar-icons/react";
import ResourceSummary from "@/components/dashboard/resource-summary";
import ComparativeEnrollment from "@/components/dashboard/comparative-enrollment";
import EnrollmentByGender from "@/components/dashboard/enrollment-by-gender";
import NotificationsCol from "@/components/dashboard/notifications-col";
import AppLayout from "@/layouts/app.layout";

const DivisionAdminDashboard = () => {
  return (
    <AppLayout>
      <QuickViewContainer>
        <QuickViewCol icon={Buildings} label="Total Schools" value="55" />
        <QuickViewCol
          icon={SquareAcademicCap}
          label="Total Learners"
          value="35,420"
        />
        <QuickViewCol icon={UserHandUp} label="Total Teachers" value="1,215" />
      </QuickViewContainer>

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
              <ResourceSummary />
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* 2nd row */}
        <Grid.Col span={3}>
          <Grid>
            <Grid.Col span={12}>
              <NotificationsCol />
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default DivisionAdminDashboard;
