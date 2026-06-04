import { Grid } from "@mantine/core";
import OverviewCol from "./overview-col";
import { Men, UsersGroupRounded, Women } from "@solar-icons/react";
import EnrollmentByGradeLevel from "./enrollment-grade-level";
import EnrollmentTrend from "./enrollment-trend";
import EnrollmentByEducationalLevel from "./enrollment-educational-level";

const dummyData = [
  { year: 2023, public: 12500, private: 6900 },
  { year: 2024, public: 14200, private: 7210 },
  { year: 2025, public: 15320, private: 5120 },
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
  return (
    <Grid rowGap={40}>
      <Grid.Col span={4}>
        <OverviewCol
          label="Total Students"
          value="35,420"
          icon={UsersGroupRounded}
        />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol label="Male" value="17,200" icon={Men} />
      </Grid.Col>
      <Grid.Col span={4}>
        <OverviewCol label="Female" value="18,220" icon={Women} />
      </Grid.Col>

      <Grid.Col span={6}>
        <EnrollmentTrend data={dummyData} />
      </Grid.Col>

      <Grid.Col span={6}>
        <EnrollmentByEducationalLevel data={anotherDummyData} />
      </Grid.Col>

      <Grid.Col span={12}>
        <EnrollmentByGradeLevel />
      </Grid.Col>
    </Grid>
  );
};

export default EnrollmentTab;
