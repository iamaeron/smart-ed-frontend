import TabListScroller from "@/components/tab-list-scroller";
import AppLayout from "@/layouts/app.layout";
import { useFetchSchool } from "@/lib/fetcher/school.fetcher";
import {
  Box,
  Button,
  Flex,
  FloatingIndicator,
  Skeleton,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { useCallback, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import classes from "@/css/Tab.module.css";
import AcademicYearPicker from "@/components/dashboard/academic-year-picker";
import SchoolInfo from "@/components/schools-directory/school-info";
import EnrollmentTab from "@/components/schools-directory/school-enrollment-tab";
import SchoolResourceTab from "@/components/schools-directory/school-resource-tab";

const DivisionAdminSchoolDirectory = () => {
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

          {isPending ? (
            <Skeleton w="100%" h={300} radius="lg" />
          ) : (
            <>
              <Tabs.Panel value="1">
                <EnrollmentTab schoolName={data.results.school.school_name} />
              </Tabs.Panel>
              <Tabs.Panel value="2">
                <SchoolResourceTab
                  schoolName={data.results.school.school_name}
                />
              </Tabs.Panel>
              <Tabs.Panel value="3">
                <SchoolInfo school={data.results.school} />
              </Tabs.Panel>
            </>
          )}
        </Tabs>
      </>
    </AppLayout>
  );
};

export default DivisionAdminSchoolDirectory;
