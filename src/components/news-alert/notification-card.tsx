import { Box, Card, Flex, Pill, Text } from "@mantine/core";
import dayjs from "dayjs";
import { AlertCircle } from "lucide-react";

type NotificationCardProps = {
  title: string;
  description: string;
  date: string;
  pillType: "new" | "action_required" | null;
  unread?: boolean;
};

const NotificationCard = ({
  title,
  description,
  date,
  pillType,
  unread,
}: NotificationCardProps) => {
  const indicatorColor = () => {
    switch (title) {
      case "Submission Returned":
        return "#DB3237";
      case "Approved Submission":
        return "#3cbb54";
      case "Pending Review":
        return "#f4c10d";
      default:
        return "#339af0";
    }
  };

  return (
    <Card withBorder style={{ borderColor: unread ? "#2C68FF" : "#dee2e6" }}>
      <Flex gap="lg">
        <Box py="sm" pl="xs">
          <div
            style={{
              height: "8px",
              width: "8px",
              backgroundColor: indicatorColor(),
              borderRadius: "999px",
            }}
          ></div>
        </Box>
        <Box>
          {pillType ? (
            pillType === "new" ? (
              <Pill mt={4} mb={6} fw={600} c="white" bg="blue">
                NEW
              </Pill>
            ) : (
              <Pill
                mt={4}
                mb={6}
                fw={600}
                c="white"
                bg="red"
                style={{ display: "flex", width: "max-content" }}
              >
                <AlertCircle
                  strokeWidth={3}
                  size={14}
                  style={{ marginRight: "4px" }}
                />
                <span>ACTION REQUIRED</span>
              </Pill>
            )
          ) : null}
          <Text mt={3} mb={6} fw={700}>
            {title}
          </Text>
          <Text c="longText" fz={14}>
            {description}
          </Text>

          <Text mt={16} c="longText" fz={14}>
            {dayjs(date).format("MMM DD, YYYY [at] hh:mm A")}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
};

export default NotificationCard;
