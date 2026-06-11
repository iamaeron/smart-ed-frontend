import { AreaChart } from "@mantine/charts";
import { Card, Group, Stack, Text } from "@mantine/core";
import { ResponsiveContainer } from "recharts";

const EnrollmentByEducationalLevel = ({
  data,
}: {
  data: Record<string, any>[];
}) => {
  console.log(data);
  return (
    <Card w="100%" bg="white" p="lg" c="mainText" radius="lg" shadow="xl">
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
            data={data}
            dataKey="academic_year"
            // withDots={false}
            dotProps={{
              r: 2.5,
            }}
            xAxisProps={{
              tickFormatter: (value, index) => {
                // 1. Always show the first item
                if (index === 0) return value;

                // 2. Always show the last item
                if (index === data.length - 1) return value;

                // 3. For any item in the middle, mask it with "..."
                return "...";
              },
            }}
            curveType="linear"
            series={[
              { name: "Elementary", color: "#2c68ff" },
              { name: "Junior High", color: "#ff9500" },
              { name: "Kinder", color: "#3cbb54" },
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
  );
};

export default EnrollmentByEducationalLevel;
