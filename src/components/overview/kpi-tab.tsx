import { AreaChart } from "@mantine/charts";
import { Box, Card, Flex, Group, Select, Text } from "@mantine/core";
import { AltArrowDown } from "@solar-icons/react";
import { ResponsiveContainer } from "recharts";
import KPIManagement from "./kpi-management";

const dummyData = [
  {
    year: "S.Y. 2023-2024",
    Male: 89,
    Female: 92,
  },
  {
    year: "S.Y. 2024-2025",
    Male: 90,
    Female: 90,
  },
  {
    year: "S.Y. 2025-2026",
    Male: 88,
    Female: 89,
  },
];

const KPITab = () => {
  return (
    <Box>
      <Card mb={30} p="lg" shadow="xl" radius="lg">
        <Box>
          <Text mb={2} fw={600}>
            KPI Trends
          </Text>
          <Text mb={18} c="longText" size="sm">
            Monitor and manage school resources
          </Text>
        </Box>

        <Flex mb={20} align="flex-end" justify="space-between">
          <Box>
            <Text c="longText" size="sm">
              TOTAL
            </Text>
            <Text mb={2} fz={30} fw={700}>
              88.4%
            </Text>
            <Text c="longText" size="sm">
              Gross Enrollment Rate
            </Text>
          </Box>

          <Group>
            <Select
              placeholder="Pick value"
              defaultValue="All Levels"
              rightSection={<AltArrowDown size={16} />}
              data={["All Levels", "Angular", "Vue", "Svelte"]}
            />
            <Select
              placeholder="Pick value"
              defaultValue="Gross Enrollment Rate"
              rightSection={<AltArrowDown size={16} />}
              data={["Gross Enrollment Rate", "Angular", "Vue", "Svelte"]}
            />
          </Group>
        </Flex>

        <ResponsiveContainer debounce={250} height={300}>
          <AreaChart
            data={dummyData}
            dataKey="year"
            dotProps={{
              r: 2.5,
            }}
            series={[
              { name: "Male", color: "blue.5" },
              { name: "Female", color: "red.4" },
            ]}
            legendProps={{
              align: "center",
              verticalAlign: "bottom",
            }}
            curveType="linear"
            withDots
            withLegend
            gridAxis="xy"
            yAxisProps={{
              domain: [85, 100],
            }}
          />
        </ResponsiveContainer>
      </Card>

      <KPIManagement />
    </Box>
  );
};

export default KPITab;
