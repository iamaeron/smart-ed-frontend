import type { Announcement } from "@/types/data/announcement.type";
import { Box, Grid, Image, Paper, Pill, Text } from "@mantine/core";
import dayjs from "dayjs";

const PublicAnnouncementCard = ({
  announcement,
}: {
  announcement: Announcement;
}) => {
  return (
    <Grid.Col span={4}>
      <Paper style={{ position: "relative" }}>
        <Paper
          style={{ position: "absolute", top: 14, left: 14 }}
          bg="rgba(255,255,255,0.3)"
          shadow="none"
          p="4px"
          radius="999px"
        >
          <Paper shadow="md" radius="999px">
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
        <Text c="longText" fz={14}>
          {announcement.description}
        </Text>
      </Box>
    </Grid.Col>
  );
};

export default PublicAnnouncementCard;
