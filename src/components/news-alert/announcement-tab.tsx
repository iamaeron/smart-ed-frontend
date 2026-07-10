import { useFetchAnnouncements } from "@/lib/fetcher/announcement.fetcher";
import type { Announcement } from "@/types/data/announcement.type";
import {
  Box,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Group,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import AddAnnouncementModal from "./add-announcement-modal";
import PublicAnnouncementCard from "./public-announcement-card";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "@/contexts/auth.context";
import NotificationCard from "./notification-card";

const AnnouncementTab = () => {
  const { user } = useAuth();
  const { data, isPending } = useFetchAnnouncements();

  return user?.role === "School Account" ? (
    <Box>
      <Group mb={30} justify="space-between">
        <Text fz={18} fw={600}>
          Announcements
        </Text>
      </Group>

      <Stack gap={20}>
        {isPending
          ? [1, 2, 3].map((i) => (
              <Skeleton key={i} h={200} radius="lg" w="100%" />
            ))
          : data?.results?.dashboard.map(
              (announcement: Announcement, i: number) => (
                <NotificationCard
                  key={i}
                  title={announcement.title}
                  description={announcement.description}
                  date={announcement.date}
                  pillType={announcement.is_new ? "new" : null}
                />
              ),
            )}
      </Stack>
    </Box>
  ) : (
    <FullAnnouncementSections data={data} isPending={isPending} />
  );
};

export default AnnouncementTab;

const FullAnnouncementSections = ({
  data,
  isPending,
}: {
  data: Record<any, any>;
  isPending: boolean;
}) => {
  const [expanded, { toggle }] = useDisclosure(false);

  const latestPublicAnnouncements =
    data?.results?.public.length > 3
      ? data?.results?.public.slice(0, 3)
      : data?.results?.public;

  const morePublicAnnouncements =
    data?.results?.public.length > 3 ? data?.results?.public.slice(3) : [];

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

          <AddAnnouncementModal type="public" />
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
                  <Grid.Col span={4} key={i}>
                    <PublicAnnouncementCard announcement={announcement} />
                  </Grid.Col>
                ),
              )}
        </Grid>

        {morePublicAnnouncements.length > 0 ? (
          <Box py="lg">
            <Divider
              mb={20}
              label={
                <Button onClick={toggle} variant="white">
                  Show{" "}
                  {expanded ? "less" : `${morePublicAnnouncements.length} more`}
                </Button>
              }
            />
            <Collapse expanded={expanded}>
              <Grid>
                {morePublicAnnouncements.map(
                  (announcement: Announcement, i: number) => (
                    <PublicAnnouncementCard
                      key={i}
                      announcement={announcement}
                    />
                  ),
                )}
              </Grid>
            </Collapse>
          </Box>
        ) : null}
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

          <AddAnnouncementModal type="dashboard" />
        </Group>

        <Stack gap={20}>
          {isPending
            ? [1, 2, 3].map((i) => (
                <Skeleton key={i} h={200} radius="lg" w="100%" />
              ))
            : data?.results?.dashboard.map(
                (announcement: Announcement, i: number) => (
                  <NotificationCard
                    key={i}
                    title={announcement.title}
                    description={announcement.description}
                    date={announcement.date}
                    pillType={announcement.is_new ? "new" : null}
                  />
                ),
              )}
        </Stack>
      </Card>
    </>
  );
};
