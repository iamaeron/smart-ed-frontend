import { useFetchKPI } from "@/lib/fetcher/kpi.fetcher";
import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import { AreaChart } from "@mantine/charts";
import { Box, Card, Flex, Group, Skeleton, Text } from "@mantine/core";
import { keepPreviousData } from "@tanstack/react-query";
import { useState } from "react";
import { ResponsiveContainer } from "recharts";
import KPISchoolTypePicker from "./kpi-school-type-picker";
import KPIRatePicker from "./kpi-rate-picker";

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

const KPITrend = () => {
  const { data: schoolTypes, isPending: isSchoolTypesPending } =
    useFetchSchoolTypes();
  const [schoolType, setSchoolType] = useState("Elementary");
  const [kpiRate, setKpiRate] = useState("Gross Enrollment Rate");
  const { data, isPending, isPlaceholderData } = useFetchKPI(
    {
      school_type: schoolType,
      kpi_rate: kpiRate,
    },
    { placeholderData: keepPreviousData },
  );

  console.log(data);

  return (
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
          {isPending ? (
            <>
              <Skeleton my={6} w={150} h={38} />
              <Skeleton w={250} h={20} />
            </>
          ) : (
            <>
              <Text mb={2} fz={30} fw={700}>
                {
                  data?.results?.data?.kpi_trends_total.find(
                    (k: any) => k.kpirate === kpiRate,
                  ).total_five_year_avg
                }
                %
              </Text>
              <Text c="longText" size="sm">
                {kpiRate}
              </Text>
            </>
          )}
        </Box>

        <Group>
          {isSchoolTypesPending ? (
            <Skeleton h={36} w={150} radius="sm" />
          ) : (
            <KPISchoolTypePicker
              data={schoolTypes.results.school_types}
              callbackFn={(v) => setSchoolType(v)}
            />
          )}
          {isPending ? (
            <Skeleton h={36} w={150} radius="sm" />
          ) : (
            <KPIRatePicker callbackFn={(v) => setKpiRate(v)} />
          )}
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
  );
};

export default KPITrend;
