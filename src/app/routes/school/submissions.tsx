import SubmissionsContainer from "@/components/submission/submissions-container";
import { useAuth } from "@/contexts/auth.context";
import AppLayout from "@/layouts/app.layout";
import { Box, Text, Title } from "@mantine/core";

const SchoolAdminSubmissions = () => {
  const { user } = useAuth();

  return (
    <AppLayout>
      <Box mb={30}>
        <Text c="primary2">SUBMISSIONS</Text>
        <Title order={1} my={6}>
          Submissions
        </Title>
        <Text c="grey">{user?.assignment.school_name}</Text>
      </Box>

      <SubmissionsContainer />
    </AppLayout>
  );
};

export default SchoolAdminSubmissions;
