import { BarChart } from "@mantine/charts";
import { Card, Group, Stack, Text } from "@mantine/core";
import { ResponsiveContainer } from "recharts";

const EnrollmentTrend = ({ data }: { data: Record<string, any>[] }) => {
  return (
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
            data={data}
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
  );
};

export default EnrollmentTrend;
