import { Group, Flex, Paper, Title, Stack, Skeleton } from "@mantine/core";
import ListFilter from "../list-filter";
import { useState } from "react";
import TabSearchBar from "../tab-search-bar";
import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import SYManagementList from "./sy-management-list";
import AddSYModal from "./add-sy-modal";

const SYManagementTab = () => {
  const { data, isPending } = useFetchAcademicYears();
  const [academicYears, setAcademicYears] = useState([]);

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
              callbackFn={(v) => {
                const filteredAcademicYears = data.results.data.filter(
                  (act: any) =>
                    act.academic_year.toLowerCase().includes(v.toLowerCase()),
                );
                setAcademicYears(filteredAcademicYears);
              }}
            />

            <ListFilter
              all="All Status"
              data={data.results.data}
              accessor="status"
              callbackFn={(v) => {
                const filteredAcademicYears = data.results.data.filter(
                  (act: any) => act.status === v,
                );
                setAcademicYears(filteredAcademicYears);
              }}
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
        <SYManagementList
          data={academicYears.length > 0 ? academicYears : data.results.data}
        />
      )}
    </Paper>
  );
};

export default SYManagementTab;
