import AppLayout from "@/layouts/app.layout";
import { Box, Text, Title } from "@mantine/core";

const SystemAdminSchoolsDirectory = () => {
  return (
    <AppLayout>
      <Box>
        <Text c="primary2">SCHOOLS DIRECTORY</Text>
        <Title order={1} my={6}>
          List of Schools
        </Title>
        <Text c="grey">Schools Division of Mabalacat City</Text>
      </Box>
    </AppLayout>
  );
};

export default SystemAdminSchoolsDirectory;
