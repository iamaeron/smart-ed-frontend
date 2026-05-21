import OverviewTabs from "@/components/overview/overview-tab";
import SystemAdminAppLayout from "@/layouts/system/app.layout";
import { Box, Flex, Select, Tabs, Text, Title } from "@mantine/core";

const SystemAdminDivisionOverview = () => {
  return (
    <SystemAdminAppLayout>
      <Flex mb={30} align="flex-end" justify="space-between">
        <Box>
          <Text c="primary2">DIVISION OVERVIEW</Text>
          <Title order={1} my={6}>
            Schools Division of Mabalacat City
          </Title>
          <Text c="grey">S.Y. 2025-2026</Text>
        </Box>

        <Select
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
          //   dropdown: {
          //     background: "rgba(255,255,255,0.2)",
          //     color: "white",
          //     border: "1px solid rgba(255,255,255,0.5)",
          //     backdropFilter: "blur(14px)",
          //   },
          // }}
          // classNames={{
          //   option: selectClasses.option,
          // }}
        />
      </Flex>

      <OverviewTabs />
    </SystemAdminAppLayout>
  );
};

export default SystemAdminDivisionOverview;
