import {
  Group,
  Flex,
  Paper,
  Title,
  Stack,
  Skeleton,
  Center,
  Pagination,
} from "@mantine/core";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";
import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import SYManagementList from "./sy-management-list";
import AddSYModal from "./add-sy-modal";
import { keepPreviousData } from "@tanstack/react-query";

const SYManagementTab = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isPlaceholderData } = useFetchAcademicYears(
    { page },
    { placeholderData: keepPreviousData },
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const baseList = data?.results?.data || [];

  const displayList = baseList.filter((act: any) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.position.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Status Filter
    const matchesPosition =
      !statusFilter || statusFilter.toLowerCase().includes("all")
        ? true
        : act.status === statusFilter;

    return matchesSearch && matchesPosition;
  });

  const handlePageChange = (newPage: number) => {
    setSearchQuery("");
    setStatusFilter("");
    setPage(newPage);
  };

  return (
    <Paper bg="white" p={26} radius="lg">
      <Flex gap={4}>
        <Title order={4}>Academic Year Management</Title>
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
              all="All Status"
              data={data.results.data}
              accessor="status"
              callbackFn={(v) => setStatusFilter(v)}
            />
          </Group>
        )}

        <AddSYModal />
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <div
          style={{
            opacity: isPlaceholderData ? 0.5 : 1,
            transition: "opacity 0.15s",
          }}
        >
          <SYManagementList data={displayList} />
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

export default SYManagementTab;
