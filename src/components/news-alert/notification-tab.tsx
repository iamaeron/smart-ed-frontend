import { useFetchNotifications } from "@/lib/fetcher/notification.fetcher";
import type { Notification } from "@/types/data/notification.type";
import { Box, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useState } from "react";
import { useSearchParams } from "react-router";
import NotificationCard from "./notification-card";
import OverviewCol from "../overview/overview-col";
import { Bell, BellBing } from "@solar-icons/react";

const NotificationTab = () => {
  const { data, isPending } = useFetchNotifications();
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState(searchParams.get("tab") ?? "total");

  const baseList = (data?.results?.data as Notification[]) || [];

  const displayList = baseList.filter((act: Notification) => {
    // View Filter from Column
    const matchesView = view === "total" ? true : act.action_required;

    return matchesView;
  });

  const handleChangeView = (nextView: string) => {
    setView(nextView);
    setSearchParams({ view: nextView }, { replace: true });
  };

  return (
    <Box>
      <Grid mb={30}>
        <Grid.Col span={6}>
          <OverviewCol
            label="All"
            highlighted={view === "total"}
            handleClick={() => handleChangeView("total")}
            value={data?.results?.count?.total}
            loading={isPending}
            icon={Bell}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <OverviewCol
            label="Action Required"
            highlighted={view === "action_required"}
            handleClick={() => handleChangeView("action_required")}
            value={data?.results?.count?.action_required}
            loading={isPending}
            icon={BellBing}
          />
        </Grid.Col>
      </Grid>

      <Group mb={30} justify="space-between">
        <Text fz={18} fw={600}>
          System Notifications
        </Text>
      </Group>

      <Stack gap={20}>
        {isPending
          ? [1, 2, 3].map((i) => <Skeleton key={i} h={200} width="100%" />)
          : displayList.map((notification) => (
              <NotificationCard
                key={notification.id}
                title={notification.title}
                description={notification.message}
                date={notification.created_at}
                pillType={
                  notification.action_required ? "action_required" : null
                }
                unread={notification.is_read === "true" ? false : true}
              />
            ))}
      </Stack>
    </Box>
  );
};

export default NotificationTab;
