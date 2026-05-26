import {
  BackgroundImage,
  Box,
  Flex,
  Paper,
  Select,
  Text,
  Title,
} from "@mantine/core";
import bg from "@/assets/dashboard-bg.jpg";
import { AltArrowDown } from "@solar-icons/react";
import AcademicYearPicker from "./academic-year-picker";

type QuickViewContainerType = {
  schoolYearData?: {
    value: string;
    label: string;
  };
  children: React.ReactNode;
};

const QuickViewContainer = ({ children }: QuickViewContainerType) => {
  return (
    <Paper>
      <BackgroundImage src={bg} c="white" p="xl" radius="lg">
        <Flex mb={30} align="flex-end" justify="space-between">
          <Box>
            <Text fw={300}>DASHBOARD</Text>
            <Title order={1} my={6}>
              Welcome Back!
            </Title>
            <Text fw={300}>Schools Division of Mabalacat City</Text>
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
