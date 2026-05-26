import { useFetchActivityLogs } from "@/lib/fetcher/activity.fetcher";
import {
  Button,
  Group,
  Flex,
  Paper,
  Title,
  Stack,
  Skeleton,
} from "@mantine/core";
import { Plus } from "lucide-react";
import ActivityList from "./activity-list";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";

const ActivityTab = () => {
  const { data, isPending } = useFetchActivityLogs();
  const [activities, setActivities] = useState([]);

  return (
    <Paper bg="white" p={26} radius="lg">
      <Flex gap={4}>
        <Title order={4}>Activity History</Title>
      </Flex>
      <Flex mt={18} mb={26} justify="space-between">
        {isPending ? (
          <Flex gap={10}>
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
          </Flex>
        ) : (
          <Group>
            <TabSearchBar
              placeholder="Search activity ..."
              callbackFn={(v) => {
                const filteredActivities = data.results.data.filter(
                  (act: any) =>
                    act.user.name.toLowerCase().includes(v.toLowerCase()),
                );
                setActivities(filteredActivities);
              }}
            />

            <ListFilter
              all="All Schools"
              data={data.results.data}
              accessor="user.school"
              callbackFn={(v) => {
                const filteredActivities = (
                  activities.length > 0 ? activities : data.results.data
                ).filter((act: any) => act.user.school === v);
                setActivities(filteredActivities);
              }}
            />

            <ListFilter
              all="All Actions"
              data={data.results.data}
              accessor="log_name"
              callbackFn={(v) => {
                const filteredActivities = data.results.data.filter(
                  (act: any) => act.log_name === v,
                );
                setActivities(filteredActivities);
              }}
            />
          </Group>
        )}

        <Button leftSection={<Plus size={16} />}>Add Account</Button>
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <ActivityList
          data={activities.length > 0 ? activities : data.results.data}
        />
      )}
    </Paper>
  );
};

export default ActivityTab;
