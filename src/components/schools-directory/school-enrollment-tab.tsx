import { Grid } from "@mantine/core";
import OverviewCol from "../overview/overview-col";
import { Men, UsersGroupRounded, Women } from "@solar-icons/react";
import EnrollmentTrend from "../overview/enrollment-trend";
import EnrollmentByEducationalLevel from "../overview/enrollment-educational-level";
import EnrollmentByGradeLevel from "../overview/enrollment-grade-level";
import { useFetchEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";
import useTransformChartData from "@/hooks/use-transform-chart-data";
import { useAuth } from "@/contexts/auth.context";

const EnrollmentTab = ({ schoolName }: { schoolName: string }) => {
  const { user } = useAuth();
  const { data, isPending } = useFetchEnrollmentData({
    school_name: schoolName,
  });
  const transformedDataChart = useTransformChartData(
    data?.results?.data?.enrollment_by_level,
  );

  const schoolEnrollmentData = data?.results?.data;

  const enrollmentByGradeData = schoolEnrollmentData?.enrollmentByGrade?.find(
    (item: any) =>
      item.academic_year === schoolEnrollmentData?.academic_year.name,
  ) || { levels: [] };

  return (
    <Grid rowGap={40}>
      <Grid.Col span={4}>
        <OverviewCol
          label="Total Students"
          value={schoolEnrollmentData?.school_totals?.total_students}
          loading={isPending}
          icon={UsersGroupRounded}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Male"
          value={schoolEnrollmentData?.school_totals?.total_male}
          loading={isPending}
          icon={Men}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol
          label="Female"
          value={schoolEnrollmentData?.school_totals?.total_female}
          loading={isPending}
          icon={Women}
        />
      </Grid.Col>

      {user?.role === "School Account" && (
        <Grid.Col span={12}>
          <EnrollmentByGradeLevel data={enrollmentByGradeData} />
        </Grid.Col>
      )}

      <Grid.Col span={6}>
        <EnrollmentTrend data={schoolEnrollmentData?.five_year_trend || []} />
      </Grid.Col>

      <Grid.Col span={6}>
        <EnrollmentByEducationalLevel data={transformedDataChart || []} />
      </Grid.Col>

      {user?.role !== "School Account" && (
        <Grid.Col span={12}>
          <EnrollmentByGradeLevel data={enrollmentByGradeData} />
        </Grid.Col>
      )}
    </Grid>
  );
};

export default EnrollmentTab;
