import {
  Button,
  Card,
  Flex,
  Group,
  Indicator,
  Stack,
  Text,
} from "@mantine/core";
import { Bell } from "@solar-icons/react";

const NotificationsCol = () => {
  return (
    <Card h="100%" radius="lg" p="lg" shadow="sm">
      <Group mb={18} align="flex-start" justify="space-between">
        <Text fw={600}>Notifications</Text>

        <Button mt={-6} p={0} variant="white" c="primary">
          View all
        </Button>
      </Group>

      <Stack>
        <Indicator
          color="subGreen"
          position="top-start"
          size={25}
          label={<Bell size={15} weight="Bold" />}
          offset={4}
        >
          <Card shadow="none" bg="lightBackground">
            <Text mb={2} size="sm" fw={600}>
              New Submission
            </Text>
            <Text c="longText" mb={2} size="sm" lineClamp={2}>
              Duquit HS has submitted enrollment data for SY 2024-2025. Requires
              validation and approval.
            </Text>

            <Flex justify="flex-end">
              <Text mt={6} c="longText" size="xs" lineClamp={2}>
                2d ago
              </Text>
            </Flex>
          </Card>
        </Indicator>
        {/* 
              <Indicator
                color="subYellow"
                position="top-start"
                size={25}
                label={<Bell size={15} weight="Bold" />}
                offset={4}
              >
                <Card shadow="none" bg="lightBackground">
                  <Text mb={2} size="sm" fw={600}>
                    Pending Submission
                  </Text>
                  <Text c="longText" mb={2} size="sm" lineClamp={2}>
                    2 schools have pending submissions awaiting your validation:
                    Mabalacat ES and Sta. Ines IS
                  </Text>

                  <Flex justify="flex-end">
                    <Text mt={6} c="longText" size="xs" lineClamp={2}>
                      2d ago
                    </Text>
                  </Flex>
                </Card>
              </Indicator> */}
      </Stack>
    </Card>
  );
};

export default NotificationsCol;
