import AcademicYearPicker from "@/components/dashboard/academic-year-picker";
import OverviewTabs from "@/components/overview/overview-tabs";
import { useAuth } from "@/contexts/auth.context";
import AppLayout from "@/layouts/app.layout";
import { useFetchSchool } from "@/lib/fetcher/school.fetcher";
import { Box, Flex, Skeleton, Text, Title } from "@mantine/core";

const SchoolAdminSchoolOverview = () => {
  const { user } = useAuth();
  const { data, isPending } = useFetchSchool(user?.assignment?.school_id ?? "");

  return (
    <AppLayout>
      <Flex mb={30} align="flex-end" justify="space-between">
        <Box>
          <Text c="primary2">SCHOOL OVERVIEW</Text>
          {isPending ? (
            <>
              <Skeleton h={44} w={400} my={6} radius="sm" />
              <Skeleton h={25} w={80} radius="sm" />
            </>
          ) : (
            <>
              <Title order={1} my={6}>
                {data.results.school.school_name}
              </Title>
              <Text c="grey">ID: {data.results.school.school_code}</Text>
            </>
          )}
        </Box>

        <AcademicYearPicker theme="default" />
      </Flex>

      <OverviewTabs />
    </AppLayout>
  );
};

export default SchoolAdminSchoolOverview;
