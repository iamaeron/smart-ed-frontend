import SubmissionsContainer from "@/components/submission/submissions-container";
import AppLayout from "@/layouts/app.layout";
import { Box, Text, Title } from "@mantine/core";

const SystemAdminSubmissions = () => {
  return (
    <AppLayout>
      <Box mb={30}>
        <Text c="primary2">SUBMISSIONS</Text>
        <Title order={1} my={6}>
          Submissions
        </Title>
        <Text c="grey">Schools Division of Mabalacat City</Text>
      </Box>

      <SubmissionsContainer />
    </AppLayout>
  );
};

export default SystemAdminSubmissions;
