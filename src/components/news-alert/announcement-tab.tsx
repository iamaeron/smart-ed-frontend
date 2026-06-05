import { useFetchAnnouncements } from "@/lib/fetcher/announcement.fetcher";
import type { Announcement } from "@/types/data/announcement.type";
import {
  Box,
  Button,
  Card,
  Collapse,
  Flex,
  Grid,
  Group,
  Pill,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import dayjs from "dayjs";
import { Plus } from "lucide-react";
import AddAnnouncementModal from "./add-announcement-modal";
import PublicAnnouncementCard from "./public-announcement-card";
import { useDisclosure } from "@mantine/hooks";

const AnnouncementTab = () => {
  const { data, isPending } = useFetchAnnouncements();
  const [expanded, { toggle }] = useDisclosure(false);

  console.log(data);

  const latestPublicAnnouncements =
    data?.results?.public.length > 3
      ? data?.results?.public.slice(0, 3)
      : data?.results?.public;

  return (
    <>
      <Card
        w="100%"
        bg="white"
        p="xl"
        pb="0"
        c="mainText"
        radius="lg"
        shadow="none"
      >
        <Group mb={30} justify="space-between">
          <Text fz={18} fw={600}>
            Public Announcements
          </Text>

          <AddAnnouncementModal />
        </Group>

        <Grid gap={30}>
          {isPending
            ? [1, 2, 3].map((i) => (
                <Grid.Col key={i} span={4}>
                  <Skeleton h={200} radius="lg" w="100%" />
                </Grid.Col>
              ))
            : latestPublicAnnouncements.map(
                (announcement: Announcement, i: number) => (
                  <PublicAnnouncementCard key={i} announcement={announcement} />
                ),
              )}
        </Grid>

        <Box py="lg">
          <Flex direction="column" align="center">
            <Button mb={20} onClick={toggle} variant="white">
              Show {expanded ? "less" : "more"}
            </Button>
            <Collapse expanded={expanded}>
              <Grid>
                {data.results.public
                  .slice(3)
                  .map((announcement: Announcement, i: number) => (
                    <PublicAnnouncementCard
                      key={i}
                      announcement={announcement}
                    />
                  ))}
              </Grid>
            </Collapse>
          </Flex>
        </Box>
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
            : data?.results?.dashboard.map(
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
