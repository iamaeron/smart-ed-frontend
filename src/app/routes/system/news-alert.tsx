import AppLayout from "@/layouts/app.layout";
import { Box, Text, Title } from "@mantine/core";

const SystemAdminNews = () => {
  return (
    <AppLayout>
      <Box>
        <Text c="primary2">NEWS & ALERT</Text>
        <Title order={1} my={6}>
          Notifications & Announcements
        </Title>
        <Text c="grey">
          Stay updated with system alerts and division announcements
        </Text>
      </Box>
    </AppLayout>
  );
};

export default SystemAdminNews;
