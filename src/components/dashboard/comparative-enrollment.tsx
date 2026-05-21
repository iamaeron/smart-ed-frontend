import { BarChart } from "@mantine/charts";
import { ResponsiveContainer } from "recharts";

const ComparativeEnrollment = () => {
  const dummyData = [
    {
      year: "2022-2023",
      North: 12540,
      East: 11950,
      South: 9050,
      West: 11950,
    },
    {
      year: "2023-2024",
      North: 12600,
      East: 11985,
      South: 9390,
      West: 11985,
    },
    {
      year: "2024-2025",
      North: 12790,
      East: 12150,
      South: 9872,
      West: 12150,
    },
  ];

  return (
    <ResponsiveContainer width="80%" debounce={250} height={200}>
      <BarChart
        data={dummyData}
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
