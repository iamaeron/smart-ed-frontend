import { useFetchPublicAnnouncements } from "@/lib/fetcher/announcement.fetcher";
import type { Announcement } from "@/types/data/announcement.type";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Title,
} from "@mantine/core";
import PublicAnnouncementCard from "../news-alert/public-announcement-card";
import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

const ITEMS_TO_SHOW = 3;
const CARD_GAP = 30;

const AdvisoriesContainer = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { data, isPending } = useFetchPublicAnnouncements();

  const rawData = data?.results?.data || [];
  const totalSteps = Math.max(1, rawData.length - ITEMS_TO_SHOW + 1);

  return (
    <Container mt={80} size="1200px">
      <Flex mb="md" align="flex-end" justify="space-between">
        <Title order={2}>Notices and Advisories</Title>
        <Button
          c="primary2"
          variant="transparent"
          to="notices-and-advisories"
          component={Link}
        >
          See More
        </Button>
      </Flex>

      <Box
        style={{ borderRadius: "1rem", overflow: "hidden", width: "100%" }}
        mih={353}
      >
        {isPending ? (
          <Grid gap={CARD_GAP} align="stretch">
            {[1, 2, 3].map((i) => (
              <Grid.Col key={i} span={4}>
                <Skeleton h={200} radius="lg" w="100%" />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <motion.div
            animate={{
              x: `calc(-${currentIdx * (100 / ITEMS_TO_SHOW)}% - ${currentIdx * (CARD_GAP / ITEMS_TO_SHOW)}px)`,
            }}
            transition={{ type: "spring", stiffness: 260, damping: 28 }}
            style={{
              display: "flex",
              gap: `${CARD_GAP}px`,
              width: "100%",
            }}
          >
            {rawData.map((announcement: Announcement, i: number) => (
              <Box
                key={i}
                style={{
                  // Forces each element to occupy exactly 1/3 minus layout spacing allocations
                  flex: `0 0 calc((100% - ${(ITEMS_TO_SHOW - 1) * CARD_GAP}px) / ${ITEMS_TO_SHOW})`,
                  display: "flex",
                }}
              >
                <PublicAnnouncementCard announcement={announcement} />
              </Box>
            ))}
          </motion.div>
        )}
      </Box>

      <Center my={60}>
        {isPending || rawData.length <= ITEMS_TO_SHOW ? null : (
          <Pagination.Root
            total={totalSteps}
            value={currentIdx + 1}
            onChange={(p) => setCurrentIdx(p - 1)}
          >
            <Group gap="xl" justify="center" align="center">
              <Pagination.Previous
                style={{
                  border: "none",
                  backgroundColor: "#cfddff",
                  color: "#192D7C",
                  borderRadius: 999,
                  height: 40,
                  width: 40,
                }}
                icon={() => <ArrowLeft size={20} />}
              />

              <Group gap="xs">
                {Array.from({ length: totalSteps }).map((_, index) => {
                  const isActive = currentIdx === index;

                  return (
                    <Box
                      key={index}
                      onClick={() => setCurrentIdx(index)}
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        backgroundColor: isActive ? "#2c68ff" : "#ccd9ff",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                    />
                  );
                })}
              </Group>

              <Pagination.Next
                style={{
                  border: "none",
                  backgroundColor: "#cfddff",
                  color: "#192D7C",
                  borderRadius: 999,
                  height: 40,
                  width: 40,
                }}
                icon={() => <ArrowRight size={20} />}
              />
            </Group>
          </Pagination.Root>
        )}
      </Center>
    </Container>
  );
};

export default AdvisoriesContainer;
