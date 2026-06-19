import AcademicYearPicker from "@/components/dashboard/academic-year-picker";
import OverviewTabs from "@/components/overview/overview-tabs";
import AppLayout from "@/layouts/app.layout";
import { useAcademicYearStore } from "@/stores/academic-year.store";
import { Box, Flex, Text, Title } from "@mantine/core";

const DivisionAdminDivisionOverview = () => {
  const selectedYear = useAcademicYearStore((state) => state.yearLabel);

  return (
    <AppLayout>
      <Flex mb={30} align="flex-end" justify="space-between">
        <Box>
          <Text c="primary2">DIVISION OVERVIEW</Text>
          <Title order={1} my={6}>
            Schools Division of Mabalacat City
          </Title>
          <Text c="grey">{selectedYear}</Text>
        </Box>

        <AcademicYearPicker theme="default" />
      </Flex>

      <OverviewTabs />
    </AppLayout>
  );
};

export default DivisionAdminDivisionOverview;
