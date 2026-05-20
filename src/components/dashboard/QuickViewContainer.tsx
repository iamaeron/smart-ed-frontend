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
import selectClasses from "@/css/select.module.css";

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
          <Select
            rightSection={<AltArrowDown color="#ffffff" />}
            placeholder="Pick value"
            data={["React", "Angular", "Vue", "Svelte"]}
            defaultValue={"React"}
            className="school-year-select"
            comboboxProps={{ shadow: "xl" }}
            styles={{
              input: {
                background: "rgba(255,255,255,0.3)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
              },
              dropdown: {
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
                backdropFilter: "blur(14px)",
              },
            }}
            classNames={{
              option: selectClasses.option,
            }}
          />
        </Flex>

        <Flex gap={16} align="center">
          {children}
        </Flex>
      </BackgroundImage>
    </Paper>
  );
};

export default QuickViewContainer;
