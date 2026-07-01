import {
  Box,
  Button,
  Card,
  Center,
  Flex,
  Grid,
  Group,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { Calendar, MapPoint, Phone, User } from "@solar-icons/react";
import { Dot, School } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import AppTooltip from "../system-management/app-tooltip";

const MotionGridCol = motion.create(Grid.Col);

const SchoolCard = ({ school }: { school: { [k: string]: any } }) => {
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 25 } as const,
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.15 } as const,
    },
  } as const;

  const address = `${school.address.street}, ${school.address.barangay}, ${school.address.city}, ${school.address.province}`;

  return (
    <MotionGridCol layout variants={itemVariants} key={school.id} span={6}>
      <Card p="lg" radius="lg" shadow="sm">
        <Flex align="start" gap="md">
          <Box w={90} h={90}>
            {school.image ? (
              <Image
                src={school.image}
                width="100%"
                height="100%"
                radius="md"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Paper h="100%" w="100%" shadow="none" bg="blue.0" radius="md">
                <Center h="100%" w="100%" c="blue.9">
                  <School strokeWidth={1.5} size={38} />
                </Center>
              </Paper>
            )}
          </Box>
          <Box flex={1}>
            <Flex mb={16} justify="space-between">
              <Box>
                <Text
                  // mt={-6}
                  fz={16}
                  fw={600}
                  c="mainText"
                >
                  {school.school_name}
                </Text>
                <Group gap={4}>
                  <Text fz={14} c="longText">
                    School ID: {school.school_code}
                  </Text>
                  <Dot size={14} />
                  <Text fz={14} c="longText">
                    {school.district}
                  </Text>
                </Group>
              </Box>

              <Box>
                <Button
                  component={Link}
                  to={`/system-admin/schools-directory/${school.id}`}
                  preventScrollReset={true}
                  variant="outline"
                  c="primary"
                  px="md"
                  radius="sm"
                  size="compact-sm"
                >
                  View
                </Button>
              </Box>
            </Flex>

            <Grid>
              <Grid.Col span={6}>
                <Flex gap={4}>
                  <div>
                    <MapPoint
                      color="#555555"
                      style={{ marginBottom: "-2px" }}
                      weight="Linear"
                      size="18"
                    />
                  </div>
                  <Box>
                    <AppTooltip
                      withArrow
                      offset={0}
                      arrowPosition="side"
                      arrowSize={5}
                      arrowOffset={10}
                      label={
                        <Flex direction="column" gap={2}>
                          <Text fz={12} fw={500} tt="capitalize">
                            {address}
                          </Text>

                          <Text
                            fz={12}
                            fw={500}
                            opacity={0.5}
                            style={{ fontStyle: "italic" }}
                          >
                            {school.latitude}, {school.longitude}
                          </Text>
                        </Flex>
                      }
                      position="bottom-start"
                    >
                      <Text
                        lineClamp={1}
                        tt="capitalize"
                        fz={14}
                        c="mainText"
                        fw={600}
                      >
                        {address}
                      </Text>
                    </AppTooltip>
                    <Text style={{ cursor: "help" }} fz={12} c="longText">
                      {school.latitude}, {school.longitude}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>

              <Grid.Col span={6}>
                <Flex gap={4}>
                  <div>
                    <User
                      color="#555555"
                      style={{ marginBottom: "-2px" }}
                      weight="Linear"
                      size="18"
                    />
                  </div>
                  <Box>
                    <AppTooltip
                      withArrow
                      offset={0}
                      arrowPosition="center"
                      label={
                        <Flex direction="column" gap={2}>
                          <Text fz={12} fw={500} tt="capitalize">
                            {school.school_head.name}
                          </Text>

                          <Text
                            fz={12}
                            fw={500}
                            opacity={0.5}
                            style={{ fontStyle: "italic" }}
                          >
                            {school.school_head.position}
                          </Text>
                        </Flex>
                      }
                      position="bottom-start"
                    >
                      <Text
                        style={{ cursor: "help" }}
                        lineClamp={1}
                        fz={14}
                        c="mainText"
                        fw={600}
                      >
                        {school.school_head.name}
                      </Text>
                    </AppTooltip>
                    <Text fz={12} c="longText">
                      {school.school_head.position}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>

              <Grid.Col span={6}>
                <Flex gap={4}>
                  <div>
                    <Phone
                      color="#555555"
                      style={{ marginBottom: "-2px" }}
                      weight="Linear"
                      size="18"
                    />
                  </div>
                  <Box>
                    <Text lineClamp={1} fz={14} c="longText">
                      {school.school_head.phone_number}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>

              <Grid.Col span={6}>
                <Flex gap={4}>
                  <div>
                    <Calendar
                      color="#555555"
                      style={{ marginBottom: "-2px" }}
                      weight="Linear"
                      size="18"
                    />
                  </div>
                  <Box>
                    <Text lineClamp={1} fz={14} c="longText">
                      Established {school.year_established}
                    </Text>
                  </Box>
                </Flex>
              </Grid.Col>
            </Grid>
          </Box>
        </Flex>
      </Card>
    </MotionGridCol>
  );
};

export default SchoolCard;
