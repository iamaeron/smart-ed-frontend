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

  const enrollmentData = data?.results?.data;

  const enrollmentByGradeData = enrollmentData?.enrollment_by_grade?.find(
    (item: any) => item.academic_year === enrollmentData?.academic_year.name,
  ) || { levels: [] };

  const totals =
    data?.results?.data?.enrollments_totals ??
    data?.results?.data?.school_totals;

  return (
    <Grid rowGap={40}>
      <Grid.Col span={4}>
        <OverviewCol
          label="Total Students"
          value={totals?.total_students}
          loading={isEnrollmentDataPending}
          icon={UsersGroupRounded}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Male"
          value={totals?.total_male}
          loading={isEnrollmentDataPending}
          icon={Men}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Female"
          value={totals?.total_female}
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
        <EnrollmentByGradeLevel
          data={enrollmentByGradeData}
          loading={isEnrollmentDataPending}
        />
      </Grid.Col>
    </Grid>
  );
};

export default EnrollmentTab;
