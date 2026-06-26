import { useFetchEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";
import { DonutChart } from "@mantine/charts";
import { Box, Card, Group, Skeleton, Stack, Text } from "@mantine/core";

const EnrollmentByGender = () => {
  const { data, isPending } = useFetchEnrollmentData();

  if (isPending) {
    return (
      <Card h="100%" radius="lg" p="lg" shadow="sm">
        <Text mb={18} fw={600}>
          Enrollment by Gender
          <Skeleton mt={18} h={193} />
        </Text>
      </Card>
    );
  }

  const totalFemale = data?.results?.data?.enrollments_totals?.total_female;
  const totalMale = data?.results?.data?.enrollments_totals?.total_male;

  const isBothZero = totalFemale === 0 && totalMale === 0;

  const enrollmentByGenderData = isBothZero
    ? [
        {
          name: "Female",
          value: 50,
          color: "#E5E7EB",
        },
        { name: "Male", value: 50, color: "#D1D5DB" },
      ]
    : [
        {
          name: "Female",
          value: totalFemale,
          color: "primary",
        },
        { name: "Male", value: totalMale, color: "accent1" },
      ];

  return (
    <Card h="100%" radius="lg" p="lg" shadow="sm">
      <Text mb={18} fw={600}>
        Enrollment by Gender
      </Text>

      <Stack gap={20} align="center" justify="center">
        <div>
          <DonutChart
            data={enrollmentByGenderData}
            withTooltip={false}
            thickness={12}
            size={130}
            pieProps={{
              isAnimationActive: true,
              animationDuration: 700,
              animationEasing: "ease-out",
              strokeLinecap: "round",
              paddingAngle: 2,
              cornerRadius: 12,
            }}
          />
        </div>
        <Group gap={20}>
          <Group gap={10}>
            <div
              style={{
                height: 12,
                width: 12,
                backgroundColor: "#2c68ff",
                borderRadius: 999,
              }}
            ></div>
            <Box>
              <Text fw={600} c="mainText">
                {totalFemale}
              </Text>
              <Text size="xs" c="longText">
                Female
              </Text>
            </Box>
          </Group>

          <Group gap={10}>
            <div
              style={{
                height: 12,
                width: 12,
                backgroundColor: "#ff9500",
                borderRadius: 999,
              }}
            ></div>
            <Box>
              <Text fw={600} c="mainText">
                {totalMale}
              </Text>
              <Text size="xs" c="longText">
                Male
              </Text>
            </Box>
          </Group>
        </Group>
      </Stack>
    </Card>
  );
};

export default EnrollmentByGender;
