import type { Announcement } from "@/types/data/announcement.type";
import { Box, Card, Grid, Image, Paper, Pill, Text } from "@mantine/core";
import dayjs from "dayjs";

const PublicAnnouncementCard = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  return (
    <Grid.Col h="100%" span={4}>
      <Card h="100%" shadow="none" bg="white" p={0}>
        <Paper style={{ position: "relative" }}>
          <Paper
            style={{ position: "absolute", top: 14, left: 14 }}
            bg="rgba(255,255,255,0.3)"
            shadow="none"
            p={4}
            radius={999}
          >
            <Paper shadow="md" radius={999}>
              <Pill size="md" bg="mainText">
                <Text c="white" fw={500} fz={14}>
                  {dayjs(announcement.date).format("MMM DD YYYY")}
                </Text>
              </Pill>
            </Paper>
          </Paper>
          <Image src={announcement.image_url} w="100%" h={200} radius="lg" />
        </Paper>
        <Box p="md">
          <Text mb={6} fw={700}>
            {announcement.title}
          </Text>
          <Text c="longText" lineClamp={3} fz={14}>
            {announcement.description}
          </Text>
        </Box>
      </Card>
    </Grid.Col>
  );
};

export default PublicAnnouncementCard;
