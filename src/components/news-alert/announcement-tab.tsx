import { useFetchAnnouncements } from "@/lib/fetcher/announcement.fetcher";
import type { Announcement } from "@/types/data/announcement.type";
import {
  Box,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Pill,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { Plus } from "lucide-react";

const AnnouncementTab = () => {
  const { data, isPending } = useFetchAnnouncements();

  console.log(data);

  return (
    <>
      <Card w="100%" bg="white" p="xl" c="mainText" radius="lg" shadow="none">
        <Group mb={30} justify="space-between">
          <Text fz={18} fw={600}>
            Public Announcements
          </Text>

          <Button leftSection={<Plus size={16} />}>New Announcement</Button>
        </Group>

        <Grid gap={30}>
          {isPending
            ? [1, 2, 3].map((i) => (
                <Grid.Col key={i}>
                  <Skeleton h={200} radius="lg" w="100%" />
                </Grid.Col>
              ))
            : data.results.public.map(
                (announcement: Announcement, i: number) => (
                  <Grid.Col key={i} span={4}>
                    <Paper style={{ position: "relative" }}>
                      <Pill
                        size="md"
                        style={{ position: "absolute", top: 14, left: 14 }}
                        bg="mainText"
                      >
                        <Text c="white" fw={500} fz={14}>
                          {dayjs(announcement.date).format("MMM DD YYYY")}
                        </Text>
                      </Pill>
                      <Image
                        src={announcement.image_url}
                        w="100%"
                        h={200}
                        radius="md"
                      />
                    </Paper>
                    <Box>
                      <Text mt={10} mb={6} fw={700}>
                        {announcement.title}
                      </Text>
                      <Text c="longText" fz={14}>
                        {announcement.description}
                      </Text>
                    </Box>
                  </Grid.Col>
                ),
              )}
        </Grid>
      </Card>

      <Card
        mt={30}
        w="100%"
        bg="white"
        p="xl"
        c="mainText"
        radius="lg"
        shadow="none"
      >
        <Group mb={30} justify="space-between">
          <Text fz={18} fw={600}>
            Dashboard Announcements
          </Text>

          <Button leftSection={<Plus size={16} />}>New Announcement</Button>
        </Group>

        <Stack gap={20}>
          {isPending
            ? [1, 2, 3].map((i) => (
                <Skeleton key={i} h={200} radius="lg" w="100%" />
              ))
            : data.results.dashboard.map(
                (announcement: Announcement, i: number) => (
                  <Card withBorder key={i}>
                    <Flex gap="lg">
                      <Box py="sm" pl="xs">
                        <div
                          style={{
                            height: "6px",
                            width: "6px",
                            backgroundColor: "#339af0",
                            borderRadius: "999px",
                          }}
                        ></div>
                      </Box>
                      <Box>
                        <Pill mb={6} fw={600} c="white" bg="blue">
                          NEW
                        </Pill>
                        <Text mb={6} fw={700}>
                          {announcement.title}
                        </Text>
                        <Text c="longText" fz={14}>
                          {announcement.description}
                        </Text>

                        <Text mt={16} c="longText" fz={14}>
                          {dayjs(announcement.date).format(
                            "MMM DD, YYYY [at] hh:mm A",
                          )}
                        </Text>
                      </Box>
                    </Flex>
                  </Card>
                ),
              )}
        </Stack>
      </Card>
    </>
  );
};

export default AnnouncementTab;
