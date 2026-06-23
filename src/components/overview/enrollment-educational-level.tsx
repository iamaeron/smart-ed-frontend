import { AreaChart } from "@mantine/charts";
import { Card, Group, Stack, Text } from "@mantine/core";
import { ResponsiveContainer } from "recharts";

const EnrollmentByEducationalLevel = ({
  data,
}: {
  data: Record<string, any>[];
}) => {
  const series = [
    { name: "Kinder", color: "#3cbb54" },
    { name: "Elementary", color: "#2c68ff" },
    { name: "Junior High", color: "#f4c10d" },
    { name: "Senior High", color: "#DB3237" },
  ];

  const legendData = data.length > 0 ? Object.entries(data[0]) : [];

  return (
    <Card w="100%" bg="white" p="lg" c="mainText" radius="lg" shadow="xl">
      <Stack gap={0} align="center">
        <Text mt={2} fw={600}>
          Enrollment by Educational Level
        </Text>
        <Text mt={2} mb={30} size="sm" c="longText">
          Student distribution across grade levels (2023-2025)
        </Text>
        <ResponsiveContainer debounce={250} height={300}>
          <AreaChart
            data={data}
            dataKey="academic_year"
            // withDots={false}
            dotProps={{
              r: 2.5,
            }}
            areaProps={{
              isAnimationActive: true,
              animationDuration: 700,
              animationEasing: "ease-out",
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
          {legendData.map(([k, _], i) => {
            const educLevel = series.find((s) => s.name === k);

            if (!educLevel) return null;

            return (
              <Group key={i} gap={6}>
                <div
                  style={{
                    height: 4,
                    width: 12,
                    backgroundColor: educLevel?.color,
                    borderRadius: 2,
                  }}
                ></div>
                <Text size="sm" fw={500} c={educLevel?.color}>
                  {educLevel.name}
                </Text>
              </Group>
            );
          })}
        </Group>
      </Stack>
    </Card>
  );
};

export default EnrollmentByEducationalLevel;
