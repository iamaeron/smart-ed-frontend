import { DonutChart } from "@mantine/charts";
import { Box, Card, Group, Stack, Text } from "@mantine/core";

const EnrollmentByGender = () => {
  const enrollDummyData = [
    { name: "Female", value: 17140, color: "primary" },
    { name: "Male", value: 17150, color: "accent1" },
  ];

  return (
    <Card h="100%" radius="lg" p="lg" shadow="sm">
      <Text mb={18} fw={600}>
        Enrollment by Gender
      </Text>

      <Stack gap={20} align="center" justify="center">
        <div>
          <DonutChart
            data={enrollDummyData}
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
                17,140
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
                17,150
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
