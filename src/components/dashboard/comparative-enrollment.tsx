import { useFetchDashboardEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";
import { BarChart } from "@mantine/charts";
import { Skeleton } from "@mantine/core";
import { ResponsiveContainer } from "recharts";

const ComparativeEnrollment = () => {
  const { data, isPending } = useFetchDashboardEnrollmentData();

  if (isPending) return <Skeleton h={200} />;

  return (
    <ResponsiveContainer width="80%" debounce={250} height={200}>
      <BarChart
        data={data?.results?.data}
        dataKey="year"
        orientation="vertical"
        type="default"
        series={[
          { name: "North", color: "indigo.8" },
          { name: "East", color: "blue.5" },
          { name: "South", color: "orange.5" },
          { name: "West", color: "yellow.5" },
        ]}
        xAxisProps={{ hide: true }}
        legendProps={{
          verticalAlign: "bottom",
        }}
        barProps={{
          strokeLinecap: "round",
          radius: [2, 999, 999, 2],
          isAnimationActive: true,
          animationDuration: 700,
          animationEasing: "ease-out",
        }}
        valueFormatter={(value) => new Intl.NumberFormat("en-US").format(value)}
        withBarValueLabel
        withLegend
        //   withLabels
      />
    </ResponsiveContainer>
  );
};

export default ComparativeEnrollment;
