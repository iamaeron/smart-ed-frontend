import { useFetchPublicAnnouncements } from "@/lib/fetcher/announcement.fetcher";
import type { Announcement } from "@/types/data/announcement.type";
import { Container, Grid, Skeleton, Title } from "@mantine/core";
import PublicAnnouncementCard from "../news-alert/public-announcement-card";

const AdvisoriesContainer = () => {
  const { data, isPending } = useFetchPublicAnnouncements();

  const latestPublicAnnouncements =
    data?.results?.data.length > 3
      ? data?.results?.data.slice(0, 3)
      : data?.results?.data;

  return (
    <Container mt={80} size="1200px">
      <Title mb="md" order={2}>
        Notices and Advisories
      </Title>

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
    </Container>
  );
};

export default AdvisoriesContainer;
