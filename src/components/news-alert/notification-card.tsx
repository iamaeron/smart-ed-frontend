import { api } from "@/lib/api";
import { Box, Card, Flex, Pill, Text } from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router";

type NotificationCardProps = {
  title: string;
  description: string;
  date: string;
  pillType: "new" | "action_required" | null;
  unread?: boolean;
  link?: string;
  id?: string;
};

const NotificationCard = ({
  title,
  description,
  date,
  pillType,
  unread,
  link,
  id,
}: NotificationCardProps) => {
  const query = useQueryClient();
  const navigate = useNavigate();

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

  const handleReadNotif = async () => {
    if (!id) alert("No notification ID was found.");

    try {
      const res = await api.put(`/api/notifications/${id}/read`);

      if (res.data.code === 200) {
        query.invalidateQueries({ queryKey: ["notifications", {}] });
        navigate(link ?? "");
      }
    } catch (e) {
      navigate(link ?? "");
    }
  };

  return (
    <Card
      onClick={link ? handleReadNotif : undefined}
      withBorder
      style={{ borderColor: unread ? "#2C68FF" : "#dee2e6" }}
      className={link ? "notif-card" : undefined}
    >
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
          <Text mt={3} mb={6} fw={700} c={unread ? "dark" : "longText"}>
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
