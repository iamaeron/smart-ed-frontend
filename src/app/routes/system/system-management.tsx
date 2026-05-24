import SystemManagementTabs from "@/components/system-management/system-management-tabs";
import AppLayout from "@/layouts/app.layout";
import { Box, Text, Title } from "@mantine/core";

const SystemAdminSystemManagement = () => {
  return (
    <AppLayout>
      <Box mb={30}>
        <Text c="primary2">SYSTEM MANAGEMENT</Text>
        <Title order={1} my={6}>
          System Management
        </Title>
        <Text c="grey">Schools Division of Mabalacat City</Text>
      </Box>

      <SystemManagementTabs />
    </AppLayout>
  );
};

export default SystemAdminSystemManagement;
