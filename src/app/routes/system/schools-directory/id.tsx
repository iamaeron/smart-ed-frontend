import Loader from "@/components/loader";
import TabListScroller from "@/components/tab-list-scroller";
import AppLayout from "@/layouts/app.layout";
import { useFetchSchool } from "@/lib/fetcher/school.fetcher";
import {
  Box,
  Button,
  Card,
  Flex,
  FloatingIndicator,
  Grid,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import classes from "@/css/Tab.module.css";
import OverviewCol from "@/components/overview/overview-col";
import {
  Buildings,
  Chair,
  Men,
  NotebookBookmark,
  UserHandUp,
  UsersGroupRounded,
  Women,
} from "@solar-icons/react";
import EnrollmentTrend from "@/components/overview/enrollment-trend";
import EnrollmentByEducationalLevel from "@/components/overview/enrollment-educational-level";
import EnrollmentByGradeLevel from "@/components/overview/enrollment-grade-level";
import ResourceSummary from "@/components/dashboard/resource-summary";
import AcademicYearPicker from "@/components/dashboard/academic-year-picker";
import SchoolInfo from "@/components/schools-directory/school-info";

const dummyData = [
  { year: 2023, public: 12500, private: 6900 },
  { year: 2024, public: 14200, private: 7210 },
  { year: 2025, public: 15320, private: 5120 },
];

const anotherDummyData = [
  {
    year: "2023",
    Elementary: 6800,
    "Junior High": 4000,
    Kindergarten: 3300,
    "Senior High": 2400,
  },
  {
    year: "2024",
    Elementary: 7200,
    "Junior High": 4300,
    Kindergarten: 3150,
    "Senior High": 2500,
  },
  {
    year: "2025",
    Elementary: 7600,
    "Junior High": 4550,
    Kindergarten: 3550,
    "Senior High": 2600,
  },
];

const SystemAdminSchoolDirectory = () => {
  const { id } = useParams();

  if (!id) return <AppLayout>id not found</AppLayout>;

  const { data, isPending } = useFetchSchool(id);

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(
    searchParams.get("tab") ?? "1",
  );

  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const setControlRef = useCallback(
    (val: string) => (node: HTMLButtonElement | null) => {
      if (node) {
        setControlsRefs((prev) => {
          if (prev[val] === node) return prev;
          return { ...prev, [val]: node };
        });
      }
    },
    [],
  );

  return (
    <AppLayout>
      {isPending ? (
        <div>Wait ..</div>
      ) : (
        <>
          <Flex mb={30} align="flex-end" justify="space-between">
            <Box>
              <Button
                ml={-16}
                variant="transparent"
                onClick={() =>
                  window.history.length > 1
                    ? navigate(-1)
                    : navigate(`/system-admin/schools-directory`, {
                        replace: true,
                      })
                }
                leftSection={<ChevronLeft stroke="#192D7C" size={20} />}
              >
                <Text c="primary2">BACK TO SCHOOLS DIRECTORY</Text>
              </Button>
              <Title order={1} my={6}>
                {data.results.school.school_name}
              </Title>
              <Text c="grey">ID: {data.results.school.school_code}</Text>
            </Box>

            <AcademicYearPicker theme="default" />
          </Flex>

          <Tabs
            variant="none"
            value={value}
            onChange={(val) => {
              const nextVal = val ?? "All";
              setValue(nextVal);
              setSearchParams({ tab: nextVal }, { replace: true });
            }}
          >
            <TabListScroller>
              <Tabs.List ref={setRootRef} className={classes.list}>
                <Tabs.Tab
                  value="1"
                  ref={setControlRef("1")}
                  className={classes.tab}
                >
                  Enrollment
                </Tabs.Tab>
                <Tabs.Tab
                  value="2"
                  ref={setControlRef("2")}
                  className={classes.tab}
                >
                  Resources
                </Tabs.Tab>
                <Tabs.Tab
                  value="3"
                  ref={setControlRef("3")}
                  className={classes.tab}
                >
                  General Information
                </Tabs.Tab>

                <FloatingIndicator
                  target={value ? controlsRefs[value] : null}
                  parent={rootRef}
                  className={classes.indicator}
                />
              </Tabs.List>
            </TabListScroller>

            <Tabs.Panel value="1">
              <Grid rowGap={40}>
                <Grid.Col span={4}>
                  <OverviewCol
                    label="Total Students"
                    value="35,420"
                    icon={UsersGroupRounded}
                  />
                </Grid.Col>
                <Grid.Col span={4}>
                  <OverviewCol label="Male" value="17,200" icon={Men} />
                </Grid.Col>
                <Grid.Col span={4}>
                  <OverviewCol label="Female" value="18,220" icon={Women} />
                </Grid.Col>

                <Grid.Col span={6}>
                  <EnrollmentTrend data={dummyData} />
                </Grid.Col>

                <Grid.Col span={6}>
                  <EnrollmentByEducationalLevel data={anotherDummyData} />
                </Grid.Col>

                <Grid.Col span={12}>
                  <EnrollmentByGradeLevel />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
            <Tabs.Panel value="2">
              <Grid rowGap={40}>
                <Grid.Col span={3}>
                  <OverviewCol
                    label="Total Classrooms"
                    value="960"
                    icon={Buildings}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <OverviewCol
                    label="Total Teachers"
                    value="1,215"
                    icon={UserHandUp}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <OverviewCol
                    label="Functional Seats"
                    value="27,000"
                    icon={Chair}
                  />
                </Grid.Col>
                <Grid.Col span={3}>
                  <OverviewCol
                    label="Learning Materials"
                    value="31,000"
                    icon={NotebookBookmark}
                  />
                </Grid.Col>

                <Grid.Col span={12}>
                  <ResourceSummary summary={false} />
                </Grid.Col>
              </Grid>
            </Tabs.Panel>
            <Tabs.Panel value="3">
              <SchoolInfo school={data.results.school} />
            </Tabs.Panel>
          </Tabs>
        </>
      )}
    </AppLayout>
  );
};

export default SystemAdminSchoolDirectory;
