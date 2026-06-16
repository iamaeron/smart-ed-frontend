import { Grid } from "@mantine/core";
import OverviewCol from "./overview-col";
import { Men, UsersGroupRounded, Women } from "@solar-icons/react";
import EnrollmentByGradeLevel from "./enrollment-grade-level";
import EnrollmentTrend from "./enrollment-trend";
import EnrollmentByEducationalLevel from "./enrollment-educational-level";
import { useFetchEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";
import useTransformChartData from "@/hooks/use-transform-chart-data";

const EnrollmentTab = () => {
  const { data, isPending: isEnrollmentDataPending } = useFetchEnrollmentData();
  const transformedDataChart = useTransformChartData(
    data?.results?.data?.enrollment_by_level,
  );

  console.log(data);

  return (
    <Grid rowGap={40}>
      <Grid.Col span={4}>
        <OverviewCol
          label="Total Students"
          value={data?.results?.data?.enrollments_totals?.total_students}
          loading={isEnrollmentDataPending}
          icon={UsersGroupRounded}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Male"
          value={data?.results?.data?.enrollments_totals?.total_male}
          loading={isEnrollmentDataPending}
          icon={Men}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Female"
          value={data?.results?.data?.enrollments_totals?.total_female}
          loading={isEnrollmentDataPending}
          icon={Women}
        />
      </Grid.Col>

      <Grid.Col span={6}>
        <EnrollmentTrend data={data?.results?.data?.five_year_trend || []} />
      </Grid.Col>

      <Grid.Col span={6}>
        <EnrollmentByEducationalLevel
          // data={anotherDummyData}
          data={transformedDataChart || []}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <EnrollmentByGradeLevel data={[]} />
      </Grid.Col>
    </Grid>
  );
};

export default EnrollmentTab;
