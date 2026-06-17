import { BackgroundImage, Box, Flex, Paper, Text, Title } from "@mantine/core";
import bg from "@/assets/dashboard-bg.jpg";
import AcademicYearPicker from "./academic-year-picker";
import { useAuth } from "@/contexts/auth.context";

type QuickViewContainerType = {
  schoolYearData?: {
    value: string;
    label: string;
  };
  children: React.ReactNode;
};

const QuickViewContainer = ({ children }: QuickViewContainerType) => {
  const { user } = useAuth();

  console.log(user);

  return (
    <Paper>
      <BackgroundImage src={bg} c="white" p="xl" radius="lg">
        <Flex mb={30} align="flex-end" justify="space-between">
          <Box>
            <Text fw={300}>DASHBOARD</Text>
            <Title order={1} my={6}>
              Welcome Back!
            </Title>
            <Text fw={300}>
              {user?.role === "School Account"
                ? user?.assignment.school_name
                : "Schools Division of Mabalacat City"}
            </Text>
          </Box>
          <AcademicYearPicker />
        </Flex>

        <Flex gap={16} align="center">
          {children}
        </Flex>
      </BackgroundImage>
    </Paper>
  );
};

export default QuickViewContainer;
