import OverviewCol from "@/components/overview/overview-col";
import SubmissionList from "@/components/submission/submission-list";
import ListFilter from "@/components/system-management/list-filter";
import TabSearchBar from "@/components/system-management/tab-search-bar";
import { useAuth } from "@/contexts/auth.context";
import AppLayout from "@/layouts/app.layout";
import { useFetchSubmissions } from "@/lib/fetcher/submission.fetcher";
import type { Submission } from "@/types/data/submission.type";
import {
  Box,
  Center,
  Flex,
  Grid,
  Group,
  Pagination,
  Skeleton,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  Alarm,
  CheckCircle,
  PenNewRound,
  UploadMinimalistic,
} from "@solar-icons/react";
import { keepPreviousData } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { useSearchParams } from "react-router";

const SchoolAdminSubmissions = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [view, setView] = useState(searchParams.get("tab") ?? "total");

  const {
    data,
    isPending: isSubmissionsPending,
    isPlaceholderData: isSubmissionsPlaceholderData,
  } = useFetchSubmissions(
    { page },
    {
      placeholderData: keepPreviousData,
    },
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const baseList =
    (data?.results?.data?.submissions as Submission[])?.sort(
      (a, b) => b.id - a.id,
    ) || [];

  const displayList = baseList.filter((act: Submission) => {
    // View Filter from Column
    const matchesView = view === "total" ? true : act.status === view;

    // Search Filter
    const matchesSearch = searchQuery
      ? act.school.name.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    // Role Filter
    const matchesRole =
      !typeFilter || typeFilter.toLowerCase().includes("all")
        ? true
        : act?.type === typeFilter;

    return matchesView && matchesSearch && matchesRole; // && matchesAction;
  });

  const handlePageChange = (newPage: number) => {
    containerRef?.current?.scrollIntoView();
    setSearchQuery("");
    setTypeFilter("");
    setPage(newPage);
  };

  const handleChangeView = (nextView: string) => {
    setView(nextView);
    setSearchParams({ view: nextView }, { replace: true });
  };

  return (
    <AppLayout>
      <Box mb={30}>
        <Text c="primary2">SUBMISSIONS</Text>
        <Title order={1} my={6}>
          Submissions
        </Title>
        <Text c="grey">{user?.assignment.school_name}</Text>
      </Box>

      <Grid mb={30} rowGap={40}>
        <Grid.Col span={3}>
          <OverviewCol
            highlighted={view === "total"}
            handleClick={() => handleChangeView("total")}
            label="Total Submissions"
            value={data?.results?.data?.counts?.submissions}
            loading={isSubmissionsPending}
            icon={UploadMinimalistic}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol
            label="Approved"
            highlighted={view === "approved"}
            handleClick={() => handleChangeView("approved")}
            value={data?.results?.data?.counts?.approved}
            loading={isSubmissionsPending}
            icon={CheckCircle}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol
            label="Pending Reviews"
            highlighted={view === "pending"}
            handleClick={() => handleChangeView("pending")}
            value={data?.results?.data?.counts?.pending}
            loading={isSubmissionsPending}
            icon={Alarm}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol
            label="Returned"
            highlighted={view === "returned"}
            handleClick={() => handleChangeView("returned")}
            value={data?.results?.data?.counts?.returned}
            loading={isSubmissionsPending}
            icon={PenNewRound}
          />
        </Grid.Col>
      </Grid>

      {isSubmissionsPending ? (
        <>
          <Flex mb={20} gap={10}>
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
            <Skeleton h={36} width={200} />
          </Flex>

          <Stack>
            <Skeleton h={200} width="100%" />
            <Skeleton h={200} width="100%" />
            <Skeleton h={200} width="100%" />
          </Stack>
        </>
      ) : (
        <>
          <Group>
            <TabSearchBar
              bg="white"
              placeholder="Search accounts ..."
              callbackFn={(v) => setSearchQuery(v)}
            />

            <ListFilter
              bg="white"
              all="All Districts"
              data={baseList}
              accessor="type"
              callbackFn={(v) => setTypeFilter(v)}
            />
          </Group>

          <SubmissionList
            data={displayList}
            pending={isSubmissionsPlaceholderData}
            ref={containerRef}
          />

          <Center my={20}>
            {isSubmissionsPending ? null : (
              <Pagination
                value={page}
                onChange={handlePageChange}
                total={data.results.pagination.last_page}
              />
            )}
          </Center>
        </>
      )}
    </AppLayout>
  );
};

export default SchoolAdminSubmissions;
