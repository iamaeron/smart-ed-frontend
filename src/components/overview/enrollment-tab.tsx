import { Grid } from "@mantine/core";
import OverviewCol from "./overview-col";
import { Men, UsersGroupRounded, Women } from "@solar-icons/react";
import EnrollmentByGradeLevel from "./enrollment-grade-level";
import EnrollmentTrend from "./enrollment-trend";
import EnrollmentByEducationalLevel from "./enrollment-educational-level";
import { useFetchEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";
import { useMemo } from "react";

const dummyData = [
  { academic_year: 2023, public: 12500, private: 6900 },
  { academic_year: 2024, public: 14200, private: 7210 },
  { academic_year: 2025, public: 15320, private: 5120 },
];

const anotherDummyData = [
  {
    year: "2023",
    Elementary: 6800,
    "Junior High": 4000,
    Kindergarten: 3300,
    "Senior High": 2400,
  },
  {
    year: "2024",
    Elementary: 7200,
    "Junior High": 4300,
    Kindergarten: 3150,
    "Senior High": 2500,
  },
  {
    year: "2025",
    Elementary: 7600,
    "Junior High": 4550,
    Kindergarten: 3550,
    "Senior High": 2600,
  },
];

const EnrollmentTab = () => {
  const { data, isPending: isEnrollmentDataPending } = useFetchEnrollmentData();

  console.log(data);

  const transformedDataChart = useMemo(() => {
    if (!data?.results?.data?.enrollment_by_level) return [];

    const allTransformedItems = [] as any;

    data.results.data.enrollment_by_level.map((obj: any) => {
      const object = obj.levels;

      const initialRow = { academic_year: obj.academic_year };

      const completedRow = object.reduce(
        (accumulator: any, currentGrade: any) => {
          return {
            ...accumulator,
            [currentGrade.grade_level]: currentGrade.total_students,
          };
        },
        initialRow,
      );

      allTransformedItems.push(completedRow);
    });

    return allTransformedItems.sort((a: any, b: any) => {
      return a.academic_year.localeCompare(b.academic_year);
    });
  }, [data]);

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
        <EnrollmentByGradeLevel />
      </Grid.Col>
    </Grid>
  );
};

export default EnrollmentTab;
