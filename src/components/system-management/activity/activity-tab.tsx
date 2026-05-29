import { useFetchActivityLogs } from "@/lib/fetcher/activity.fetcher";
import {
  Group,
  Flex,
  Paper,
  Title,
  Stack,
  Skeleton,
  Pagination,
  Center,
} from "@mantine/core";
import ActivityList from "./activity-list";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";
import { keepPreviousData } from "@tanstack/react-query";

const ActivityTab = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isPlaceholderData } = useFetchActivityLogs(
    {
      page,
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [schoolFilter, setSchoolFilter] = useState("");
  const [actionFilter, setActionFilter] = useState("");

  const baseList = data?.results?.data || [];

  const displayList = baseList.filter((act: any) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? act.user.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // School Filter
    const matchesSchool =
      !schoolFilter || schoolFilter.toLowerCase().includes("all")
        ? true
        : act.user.school === schoolFilter;

    // Action Filter
    const matchesAction =
      !actionFilter || actionFilter.toLowerCase().includes("all")
        ? true
        : act.log_name === actionFilter;

    return matchesSearch && matchesSchool && matchesAction;
  });

  const handlePageChange = (newPage: number) => {
    setSearchQuery("");
    setSchoolFilter("");
    setActionFilter("");
    setPage(newPage);
  };

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
              callbackFn={(v) => setSearchQuery(v)}
            />

            <ListFilter
              all="All Schools"
              data={baseList}
              accessor="user.school"
              callbackFn={(v) => setSchoolFilter(v)}
            />

            <ListFilter
              all="All Actions"
              data={baseList}
              accessor="log_name"
              callbackFn={(v) => setActionFilter(v)}
            />
          </Group>
        )}
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={40} radius={6} />
          <Skeleton h={40} radius={6} />
          <Skeleton h={40} radius={6} />
          <Skeleton h={40} radius={6} />
          <Skeleton h={40} radius={6} />
        </Stack>
      ) : (
        <div
          style={{
            opacity: isPlaceholderData ? 0.5 : 1,
            transition: "opacity 0.15s",
          }}
        >
          <ActivityList page={page} data={displayList} />
        </div>
      )}

      <Center my={20}>
        {isPending ? null : (
          <Pagination
            value={page}
            onChange={handlePageChange}
            total={data.results.pagination.last_page}
          />
        )}
      </Center>
    </Paper>
  );
};

export default ActivityTab;
