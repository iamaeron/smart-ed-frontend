import AddSchoolModal from "@/components/schools-directory/add-school-modal";
import SchoolsDirectoryTabs from "@/components/schools-directory/schools-directory-tabs";
import ListFilter from "@/components/system-management/list-filter";
import TabSearchBar from "@/components/system-management/tab-search-bar";
import AppLayout from "@/layouts/app.layout";
import { useFetchSchools } from "@/lib/fetcher/school.fetcher";
import { Group, Box, Flex, Skeleton, Text, Title } from "@mantine/core";
import { useState } from "react";

const DivisionAdminSchoolsDirectory = () => {
  const { data, isPending } = useFetchSchools({ all: true });
  const [searchQuery, setSearchQuery] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const baseList = data?.results?.schools || [];

  const displayList = baseList.filter((act: any) => {
    // Search Filter
    const matchesSearch = searchQuery
      ? act.school_name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // District Filter
    const matchesDistrict =
      !districtFilter || districtFilter.toLowerCase().includes("all")
        ? true
        : act.district === districtFilter;

    return matchesSearch && matchesDistrict;
  });

  return (
    <AppLayout>
      <Box>
        <Text c="primary2">SCHOOLS DIRECTORY</Text>
        <Title order={1} my={6}>
          List of Schools
        </Title>
        <Text c="grey">Schools Division of Mabalacat City</Text>
      </Box>
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
              bg="white"
              placeholder="Search accounts ..."
              callbackFn={(v) => setSearchQuery(v)}
            />

            <ListFilter
              bg="white"
              all="All Districts"
              data={data.results.schools}
              accessor="district"
              callbackFn={(v) => setDistrictFilter(v)}
            />
          </Group>
        )}

        <AddSchoolModal />
      </Flex>

      <SchoolsDirectoryTabs schools={displayList} />
    </AppLayout>
  );
};

export default DivisionAdminSchoolsDirectory;
