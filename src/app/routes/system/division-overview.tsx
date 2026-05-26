import AcademicYearPicker from "@/components/dashboard/academic-year-picker";
import OverviewTabs from "@/components/overview/overview-tabs";
import AppLayout from "@/layouts/app.layout";
import { Box, Flex, Select, Text, Title } from "@mantine/core";

const SystemAdminDivisionOverview = () => {
  return (
    <AppLayout>
      <Flex mb={30} align="flex-end" justify="space-between">
        <Box>
          <Text c="primary2">DIVISION OVERVIEW</Text>
          <Title order={1} my={6}>
            Schools Division of Mabalacat City
          </Title>
          <Text c="grey">S.Y. 2025-2026</Text>
        </Box>

        <AcademicYearPicker theme="default" />
        {/* <Select
          placeholder="Pick value"
          data={["React", "Angular", "Vue", "Svelte"]}
          defaultValue={"React"}
          className="school-year-select"
          comboboxProps={{ shadow: "xl" }}
          styles={{
            input: {
              background: "#EAEAFF",
              border: "#EAEAFF",
            },
          }}
        /> */}
      </Flex>

      <OverviewTabs />
    </AppLayout>
  );
};

export default SystemAdminDivisionOverview;
