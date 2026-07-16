import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Skeleton,
  Text,
  Title,
  ActionIcon,
} from "@mantine/core";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react"; // or "framer-motion"
import { useFetchSchoolsPublic } from "@/lib/fetcher/school.fetcher";
import SchoolCard from "./school-card";

// Let's assume we want to show 4 cards at a time as shown in your image
const ITEMS_TO_SHOW = 4;
const CARD_GAP = 20; // 20px gap spacing between your school cards

const ExploreSchoolsContainer = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const { data, isPending } = useFetchSchoolsPublic({ per_page: 20 });

  const rawData = data?.results?.data || [];
  const maxIdx = Math.max(0, rawData.length - ITEMS_TO_SHOW);

  // Navigation handlers
  const handlePrev = () => {
    setCurrentIdx((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIdx((prev) => Math.min(maxIdx, prev + 1));
  };

  return (
    <Container mt={80} size="1200px">
      <Flex direction="column" align="center" mb={40}>
        <Title order={1} ta="center" mb={8}>
          Explore Schools
        </Title>
        <Text c="longText" ta="center">
          Access detailed school information and performance-related data.
        </Text>
      </Flex>

      {/* Main Carousel Wrapper */}
      <Flex align="center" justify="space-between" gap="none">
        {/* Left Arrow Button */}
        <ActionIcon
          onClick={handlePrev}
          disabled={currentIdx === 0 || isPending}
          radius="xl"
          size={40}
          variant="filled"
          style={{
            border: "none",
            backgroundColor: currentIdx === 0 ? "#f1f3f5" : "#e0e8ff",
            color: currentIdx === 0 ? "#adb5bd" : "#3b5bdb",
            cursor: currentIdx === 0 ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowLeft size={18} />
        </ActionIcon>

        {/* Masking Container (The Lens) */}
        <Box
          style={{
            overflow: "hidden",
            flex: 1,
            paddingBottom: 60,
            paddingRight: 17,
            paddingLeft: 17,
            display: "flex",
            alignItems: "stretch",
          }}
        >
          {isPending ? (
            <Flex gap={CARD_GAP}>
              {[1, 2, 3, 4].map((i) => (
                <Box
                  key={i}
                  style={{
                    flex: `0 0 calc((100% - ${(ITEMS_TO_SHOW - 1) * CARD_GAP}px) / ${ITEMS_TO_SHOW})`,
                  }}
                >
                  <Skeleton h={220} radius="lg" w="100%" />
                </Box>
              ))}
            </Flex>
          ) : (
            /* Motion Track containing all the card nodes */
            <motion.div
              animate={{
                x: `calc(-${currentIdx * (100 / ITEMS_TO_SHOW)}% - ${currentIdx * (CARD_GAP / ITEMS_TO_SHOW)}px)`,
              }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
              style={{
                display: "flex",
                gap: `${CARD_GAP}px`,
                alignItems: "stretch",
                width: "100%",
              }}
            >
              {rawData.map((school: any) => (
                <Box
                  key={school.id}
                  style={{
                    // Flex basis divides the layout into exactly 4 parts while accounting for gaps
                    flex: `0 0 calc((100% - ${(ITEMS_TO_SHOW - 1) * CARD_GAP}px) / ${ITEMS_TO_SHOW})`,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <SchoolCard school={school} />
                </Box>
              ))}
            </motion.div>
          )}
        </Box>

        {/* Right Arrow Button */}
        <ActionIcon
          onClick={handleNext}
          disabled={currentIdx === maxIdx || isPending}
          radius="xl"
          size={40}
          variant="filled"
          style={{
            border: "none",
            backgroundColor: currentIdx === maxIdx ? "#f1f3f5" : "#e0e8ff",
            color: currentIdx === maxIdx ? "#adb5bd" : "#102a43",
            cursor: currentIdx === maxIdx ? "not-allowed" : "pointer",
            flexShrink: 0,
          }}
        >
          <ArrowRight size={18} />
        </ActionIcon>
      </Flex>

      {/* Footer "View All Schools" Button */}
      <Center mt={10}>
        <Button size="md" radius="sm" bg="#2c68ff">
          View All Schools
        </Button>
      </Center>
    </Container>
  );
};

export default ExploreSchoolsContainer;
