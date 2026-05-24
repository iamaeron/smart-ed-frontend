import { Card, Grid, Group, Stack, Text } from "@mantine/core";
import OverviewCol from "./overview-col";
import { Men, UsersGroupRounded, Women } from "@solar-icons/react";
import { AreaChart, BarChart } from "@mantine/charts";
import EnrollmentByGradeLevel from "./enrollment-grade-level";
import { ResponsiveContainer } from "recharts";

const EnrollmentTab = () => {
  const dummyData = [
    { year: 2023, public: 12500, private: 6900 },
    { year: 2024, public: 14200, private: 7210 },
    { year: 2025, public: 15320, private: 5120 },
  ];

  const anotherDummyData = [
    {
      year: "2023",
      Elementary: 6800,
      "Junior High": 4000,
      Kindergarten: 3300,
      "Senior High": 2400,
    },
    {
      year: "2024",
      Elementary: 7200,
      "Junior High": 4300,
      Kindergarten: 3150,
      "Senior High": 2500,
    },
    {
      year: "2025",
      Elementary: 7600,
      "Junior High": 4550,
      Kindergarten: 3550,
      "Senior High": 2600,
    },
  ];

  return (
    <Grid rowGap={40}>
      <Grid.Col span={4}>
        <OverviewCol
          label="Total Students"
          value="35,420"
          icon={UsersGroupRounded}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol label="Male" value="17,200" icon={Men} />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol label="Female" value="18,220" icon={Women} />
      </Grid.Col>

      <Grid.Col span={6}>
        <Card
          w="100%"
          bg="white"
          h="100%"
          // withBorder
          p="lg"
          c="mainText"
          radius="lg"
          // bd="1px solid rgba(0,0,0,0.1)"
          shadow="xl"
        >
          <Stack gap={0} align="center">
            <Text mt={2} fw={600}>
              Three-Year Enrollment Trend
            </Text>
            <Text mt={2} size="sm" c="longText">
              Public vs. Private School Enrollment (2023-2025)
            </Text>
            <Group my={20} gap={14}>
              <Group gap={6}>
                <div
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: "#2c68ff",
                    borderRadius: 999,
                  }}
                ></div>
                <Text size="sm" fw={500} c="primary">
                  Public
                </Text>
              </Group>

              <Group gap={6}>
                <div
                  style={{
                    height: 12,
                    width: 12,
                    backgroundColor: "#ff9500",
                    borderRadius: 999,
                  }}
                ></div>
                <Text size="sm" fw={500} c="accent1">
                  Private
                </Text>
              </Group>
            </Group>

            <ResponsiveContainer debounce={250} height={300}>
              <BarChart
                h={300}
                w="100%"
                data={dummyData}
                dataKey="year"
                barProps={{
                  strokeLinecap: "round",
                  radius: [99, 999, 5, 5],
                }}
                series={[
                  { name: "public", color: "primary" },
                  { name: "private", color: "accent1" },
                ]}
                tickLine="none"
              />
            </ResponsiveContainer>
          </Stack>
        </Card>
      </Grid.Col>

      <Grid.Col span={6}>
        <Card
          w="100%"
          bg="white"
          // withBorder
          p="lg"
          c="mainText"
          radius="lg"
          // bd="1px solid rgba(0,0,0,0.1)"
          shadow="xl"
        >
          <Stack gap={0} align="center">
            <Text mt={2} fw={600}>
              Enrollment by Educational Level
            </Text>
            <Text mt={2} mb={30} size="sm" c="longText">
              Student distribution across grade levels (2023-2025)
            </Text>
            {/* <LineChart
                  h={300}
                  data={anotherDummyData}
                  dataKey="year"
                  series={[
                    { name: "Elementary", color: "blue" },
                    { name: "Junior High", color: "orange" },
                    { name: "Kindergarten", color: "green" },
                    { name: "Senior High", color: "red" },
                  ]}
                  curveType="linear"
                  withDots
                /> */}

            <ResponsiveContainer debounce={250} height={300}>
              <AreaChart
                data={anotherDummyData}
                dataKey="year"
                // withDots={false}
                dotProps={{
                  r: 2.5,
                }}
                curveType="linear"
                series={[
                  { name: "Elementary", color: "#2c68ff" },
                  { name: "Junior High", color: "#ff9500" },
                  { name: "Kindergarten", color: "#3cbb54" },
                  { name: "Senior High", color: "#DB3237" },
                ]}
              />
            </ResponsiveContainer>

            <Group mt={20} gap={14}>
              <Group gap={6}>
                <div
                  style={{
                    height: 4,
                    width: 12,
                    backgroundColor: "#3cbb54",
                    borderRadius: 2,
                  }}
                ></div>
                <Text size="sm" fw={500} c="subGreen">
                  Kindergarten
                </Text>
              </Group>

              <Group gap={6}>
                <div
                  style={{
                    height: 4,
                    width: 12,
                    backgroundColor: "#2c68ff",
                    borderRadius: 2,
                  }}
                ></div>
                <Text size="sm" fw={500} c="primary">
                  Elementary
                </Text>
              </Group>

              <Group gap={6}>
                <div
                  style={{
                    height: 4,
                    width: 12,
                    backgroundColor: "#ff9500",
                    borderRadius: 2,
                  }}
                ></div>
                <Text size="sm" fw={500} c="accent1">
                  Junior High
                </Text>
              </Group>

              <Group gap={6}>
                <div
                  style={{
                    height: 4,
                    width: 12,
                    backgroundColor: "#DB3237",
                    borderRadius: 2,
                  }}
                ></div>
                <Text size="sm" fw={500} c="subRed">
                  Senior High
                </Text>
              </Group>
            </Group>
          </Stack>
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <EnrollmentByGradeLevel />
      </Grid.Col>
    </Grid>
  );
};

export default EnrollmentTab;
