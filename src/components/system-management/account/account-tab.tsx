import { useFetchUserAccounts } from "@/lib/fetcher/user.fetcher";
import {
  Center,
  Flex,
  Group,
  Pagination,
  Paper,
  Skeleton,
  Stack,
  Title,
} from "@mantine/core";
import AccountList from "./account-list";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";
import { keepPreviousData } from "@tanstack/react-query";
import AddAccountModal from "./add-account-modal";
import ListPending from "@/components/list-pending";

const AccountTab = () => {
  const [page, setPage] = useState(1);
  const { data, isPending, isPlaceholderData } = useFetchUserAccounts(
    { per_page: 5, page },
    {
      placeholderData: keepPreviousData,
    },
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  console.log(data);

  const baseList = data?.results?.users || [];

  const displayList = baseList.filter((act: any) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? act.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Role Filter
    const matchesRole =
      !roleFilter || roleFilter.toLowerCase().includes("all")
        ? true
        : act?.role === roleFilter;

    // Action Filter
    // const matchesAction =
    //   !actionFilter || actionFilter.toLowerCase().includes("all")
    //     ? true
    //     : act.log_name === actionFilter;

    return matchesSearch && matchesRole; // && matchesAction;
  });

  const handlePageChange = (newPage: number) => {
    setSearchQuery("");
    setRoleFilter("");
    setPage(newPage);
  };

  return (
    <Paper bg="white" p={26} radius="lg">
      <Flex gap={4}>
        <Title order={4}>User Accounts</Title>
        {!isPending && (
          <Title order={4} c="longText">
            ({data.results.users.length})
          </Title>
        )}
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
              placeholder="Search accounts ..."
              callbackFn={(v) => setSearchQuery(v)}
            />

            <ListFilter
              all="All Roles"
              data={data.results.users}
              accessor="role"
              callbackFn={(v) => setRoleFilter(v)}
            />
          </Group>
        )}

        <AddAccountModal />
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <ListPending pending={isPlaceholderData}>
          <AccountList data={displayList} />
        </ListPending>
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

export default AccountTab;
