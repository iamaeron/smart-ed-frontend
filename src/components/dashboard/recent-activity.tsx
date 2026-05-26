import { useFetchActivityLogs } from "@/lib/fetcher/activity.fetcher";
import type { Log } from "@/types/data/log.type";
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";

const RecentActivity = () => {
  const { data, isPending } = useFetchActivityLogs({
    per_page: 2,
    sortBy: "created_at",
  });

  return (
    <Card h="100%" radius="lg" p="lg" shadow="sm">
      <Group mb={18} align="flex-start" justify="space-between">
        <Text fw={600}>Recent Activity</Text>

        <Button mt={-6} p={0} variant="white" c="primary">
          View all
        </Button>
      </Group>

      {isPending ? (
        <Center>
          <Loader />
        </Center>
      ) : (
        <Stack gap={4}>
          {data.results ? (
            data.results.data.map((log: Log) => (
              <Paper key={log.id} p="sm" radius="md" withBorder shadow="none">
                <Box>
                  <Text
                    size="xs"
                    tt="uppercase"
                    fw={600}
                    // bg="lightBackground"
                    c="primary"
                  >
                    {log.log_name}
                  </Text>
                  <Text mt={6} mb={4} truncate size="sm" fw={600}>
                    {log.user.name}
                  </Text>
                  <Text size="xs" c="longText">
                    {dayjs(log.datetime).format("hh:mm A • MMM DD")}
                  </Text>
                </Box>
              </Paper>
            ))
          ) : (
            <Center>
              <Text size="sm">{data.message}</Text>
            </Center>
          )}
        </Stack>
      )}
    </Card>
  );
};

export default RecentActivity;
