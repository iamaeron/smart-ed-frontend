import { useAuth } from "@/contexts/auth.context";
import { useFetchNotifications } from "@/lib/fetcher/notification.fetcher";
import type { Notification } from "@/types/data/notification.type";
import {
  Button,
  Card,
  Center,
  Flex,
  Group,
  Indicator,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import { Bell } from "@solar-icons/react";
import dayjs from "dayjs";
import { Link } from "react-router";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const NotificationsCol = () => {
  const { user } = useAuth();
  const { data, isPending } = useFetchNotifications({
    per_page: user?.role === "School Account" ? 3 : 1,
  });

  const getColor = (title: string) => {
    switch (title) {
      case "Pending Review":
        return "subYellow";
      case "Submission Approved":
        return "subGreen";
      case "Submission Returned":
        return "subRed";
      default:
        return "blue";
    }
  };

  return (
    <Card h="100%" radius="lg" p="lg" shadow="sm">
      <Group mb={18} align="flex-start" justify="space-between">
        <Text fw={600}>Notifications</Text>

        <Button
          component={Link}
          to={`/${user?.role.toLowerCase().replace(" ", "-")}/news`}
          mt={-6}
          p={0}
          variant="white"
          c="primary"
        >
          View all
        </Button>
      </Group>

      <Stack>
        {isPending ? (
          <Skeleton h={50} />
        ) : data.results.data.length > 0 ? (
          data.results.data.map((notif: Notification) => (
            <Indicator
              key={notif.id}
              color={getColor(notif.title)}
              position="top-start"
              size={25}
              label={<Bell size={15} weight="Bold" />}
              offset={4}
            >
              <Card shadow="none" bg="lightBackground">
                <Text mb={2} size="sm" fw={600}>
                  {notif.title}
                </Text>
                <Text c="longText" mb={2} size="sm" lineClamp={2}>
                  {notif.message}
                </Text>

                <Flex justify="flex-end">
                  <Text mt={6} c="longText" size="xs" lineClamp={2}>
                    {dayjs(notif.created_at).fromNow()}
                  </Text>
                </Flex>
              </Card>
            </Indicator>
          ))
        ) : (
          <Center>No notification found.</Center>
        )}
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
