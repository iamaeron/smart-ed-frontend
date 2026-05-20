import QuickViewCol from "@/components/dashboard/QuickViewCol";
import QuickViewContainer from "@/components/dashboard/QuickViewContainer";
import SystemAdminAppLayout from "@/layouts/system/AppLayout";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Indicator,
  Paper,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  Bell,
  Buildings,
  SquareAcademicCap,
  UserHandUp,
} from "@solar-icons/react";
import { DonutChart } from "@mantine/charts";
import ResourceSummary from "@/components/dashboard/ResourceSummary";
import RecentActivity from "@/components/dashboard/RecentActivity";

const SystemAdminDashboard = () => {
  const enrollDummyData = [
    { name: "Female", value: 17140, color: "primary" },
    { name: "Male", value: 17150, color: "accent1" },
  ];

  return (
    <SystemAdminAppLayout>
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
        <Grid.Col span={3}>
          <Card radius="lg" p="lg" shadow="sm">
            <Text mb={18} fw={600}>
              Enrollment by Gender
            </Text>

            <Group gap={20} justify="center">
              <div>
                <DonutChart
                  data={enrollDummyData}
                  withTooltip={false}
                  thickness={12}
                  size={130}
                  pieProps={{
                    paddingAngle: 2,
                    strokeLinecap: "round",
                    cornerRadius: 12,
                  }}
                />
              </div>
              <Stack gap={10}>
                <Group gap={10}>
                  <div
                    style={{
                      height: 12,
                      width: 12,
                      backgroundColor: "#2c68ff",
                      borderRadius: 999,
                    }}
                  ></div>
                  <Box>
                    <Text fw={600} c="mainText">
                      17,140
                    </Text>
                    <Text size="xs" c="longText">
                      Female
                    </Text>
                  </Box>
                </Group>

                <Group gap={10}>
                  <div
                    style={{
                      height: 12,
                      width: 12,
                      backgroundColor: "#ff9500",
                      borderRadius: 999,
                    }}
                  ></div>
                  <Box>
                    <Text fw={600} c="mainText">
                      17,150
                    </Text>
                    <Text size="xs" c="longText">
                      Male
                    </Text>
                  </Box>
                </Group>
              </Stack>
            </Group>
          </Card>
        </Grid.Col>
        <Grid.Col span={6}>
          <Card h="100%" radius="lg" p="lg" shadow="sm">
            <Text mb={14} fw={600}>
              Comparative Enrollment
            </Text>
          </Card>
        </Grid.Col>
        <Grid.Col span={3}>
          <Card h="100%" radius="lg" p="lg" shadow="sm">
            <Group mb={18} align="flex-start" justify="space-between">
              <Text fw={600}>Notifications</Text>

              <Button mt={-6} p={0} variant="white" c="primary">
                View all
              </Button>
            </Group>

            <Stack>
              <Indicator
                color="subGreen"
                position="top-start"
                size={25}
                label={<Bell size={15} weight="Bold" />}
                offset={4}
              >
                <Card shadow="none" bg="lightBackground">
                  <Text mb={2} size="sm" fw={600}>
                    New Submission
                  </Text>
                  <Text c="longText" mb={2} size="sm" lineClamp={2}>
                    Duquit HS has submitted enrollment data for SY 2024-2025.
                    Requires validation and approval.
                  </Text>

                  <Flex justify="flex-end">
                    <Text mt={6} c="longText" size="xs" lineClamp={2}>
                      2d ago
                    </Text>
                  </Flex>
                </Card>
              </Indicator>
              {/* 
              <Indicator
                color="subYellow"
                position="top-start"
                size={25}
                label={<Bell size={15} weight="Bold" />}
                offset={4}
              >
                <Card shadow="none" bg="lightBackground">
                  <Text mb={2} size="sm" fw={600}>
                    Pending Submission
                  </Text>
                  <Text c="longText" mb={2} size="sm" lineClamp={2}>
                    2 schools have pending submissions awaiting your validation:
                    Mabalacat ES and Sta. Ines IS
                  </Text>

                  <Flex justify="flex-end">
                    <Text mt={6} c="longText" size="xs" lineClamp={2}>
                      2d ago
                    </Text>
                  </Flex>
                </Card>
              </Indicator> */}
            </Stack>
          </Card>
        </Grid.Col>

        {/* 2nd row */}
        <Grid.Col span={9}>
          <ResourceSummary />
        </Grid.Col>
        <Grid.Col span={3}>
          <RecentActivity />
        </Grid.Col>
      </Grid>
    </SystemAdminAppLayout>
  );
};

export default SystemAdminDashboard;
