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
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";
import { useFetchDivisionLeadership } from "@/lib/fetcher/division-leadership.fetcher";
import DivisionLeadershipList from "./div-leadership-list";
// import SYManagementList from "./sy-management-list";

const DivisionLeadershipTab = () => {
  const { data, isPending } = useFetchDivisionLeadership();
  const [searchQuery, setSearchQuery] = useState("");
  const [positionFilter, setPositionFilter] = useState("");

  const baseList = data?.results?.division_leadership || [];

  const displayList = baseList.filter((act: any) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? act.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.position.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Position Filter
    const matchesPosition =
      !positionFilter || positionFilter.toLowerCase().includes("all")
        ? true
        : act.position === positionFilter;

    return matchesSearch && matchesPosition;
  });

  console.log(data);

  return (
    <Paper bg="white" p={26} radius="lg">
      <Flex gap={4}>
        <Title order={4}>Division Leadership</Title>
        {!isPending && (
          <Title order={4} c="longText">
            ({data.results.division_leadership.length})
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
              placeholder="Search activity ..."
              callbackFn={(v) => setSearchQuery(v)}
            />

            <ListFilter
              all="All Positions"
              data={data.results.division_leadership}
              accessor="position"
              callbackFn={(v) => setPositionFilter(v)}
            />
          </Group>
        )}

        <Button leftSection={<Plus size={16} />}>Add Personnel</Button>
      </Flex>

      {isPending ? (
        <Stack gap={10}>
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
          <Skeleton h={20} radius={6} />
        </Stack>
      ) : (
        <DivisionLeadershipList data={displayList} />
      )}
    </Paper>
  );
};

export default DivisionLeadershipTab;
