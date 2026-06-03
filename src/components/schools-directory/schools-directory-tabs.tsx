import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import {
  Box,
  Button,
  Card,
  Flex,
  FloatingIndicator,
  Grid,
  Group,
  Image,
  Skeleton,
  Tabs,
  Text,
} from "@mantine/core";
import classes from "@/css/Tab.module.css";
import { useLayoutEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { Dot } from "lucide-react";
import { Calendar, MapPoint, Phone, User } from "@solar-icons/react";
import TabListScroller from "../tab-list-scroller";
import AppTooltip from "../system-management/app-tooltip";

const SchoolsDirectoryTabs = ({ schools }: { schools: any[] }) => {
  const { data, isPending } = useFetchSchoolTypes();

  const baseTabs = data?.results?.school_types
    ? [{ id: 543, name: "All" }, ...data?.results?.school_types]
    : [];

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(
    searchParams.get("tab") ?? "All",
  );

  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  useLayoutEffect(() => {
    if (!isPending) {
      if (baseTabs.length > 0) {
        setIsReady(true);
      }
    }
  }, [baseTabs, isPending, controlsRefs]);

  return (
    <Tabs
      variant="none"
      value={value}
      onChange={(value) => {
        setValue(value);
        setSearchParams({ tab: value ?? "" });
      }}
    >
      <TabListScroller>
        <Tabs.List ref={setRootRef} className={classes.list}>
          {isPending ? (
            <Flex>
              <Skeleton h={36} width={200} />
            </Flex>
          ) : (
            <>
              {baseTabs.map((type: any) => (
                <Tabs.Tab
                  value={type.name}
                  ref={setControlRef(type.name)}
                  className={classes.tab}
                >
                  {type.name}
                </Tabs.Tab>
              ))}
              {isReady && (
                <FloatingIndicator
                  target={value ? controlsRefs[value] : null}
                  parent={rootRef}
                  className={classes.indicator}
                />
              )}
            </>
          )}
        </Tabs.List>
      </TabListScroller>

      {isPending ? (
        <Flex gap={10} mt={20}>
          <Skeleton h={36} width={200} />
        </Flex>
      ) : (
        baseTabs.map((type: any) => (
          <Tabs.Panel key={type.id} value={type.name}>
            <Grid gap="lg">
              {schools
                .filter((s) => value === "All" || s.school_type.name === value)
                .map((school) => (
                  <Grid.Col key={school.id} span={6}>
                    <Card p="lg" radius="lg" shadow="sm">
                      <Flex align="center" gap="md">
                        <Box>
                          <Image
                            src={school.image ?? "/spcf-logo.png"}
                            width={90}
                            height={90}
                            radius="md"
                          />
                        </Box>
                        <Box flex={1}>
                          <Flex mb={16} justify="space-between">
                            <Box>
                              <Text mt={-6} fz={16} fw={600} c="mainText">
                                {school.school_name}
                              </Text>
                              <Group gap={4}>
                                <Text fz={14} c="longText">
                                  School ID: {school.school_code}
                                </Text>
                                <Dot size={14} />
                                <Text fz={14} c="longText">
                                  {school.district}
                                </Text>
                              </Group>
                            </Box>

                            <Box>
                              <Button
                                component={Link}
                                to={`/system-admin/schools-directory/${school.id}`}
                                preventScrollReset={true}
                                variant="outline"
                                c="primary"
                                px="md"
                                radius="sm"
                                size="compact-sm"
                              >
                                View
                              </Button>
                            </Box>
                          </Flex>

                          <Grid>
                            <Grid.Col span={6}>
                              <Flex gap={4}>
                                <div>
                                  <MapPoint
                                    style={{ marginBottom: "-2px" }}
                                    weight="Linear"
                                    size="18"
                                  />
                                </div>
                                <Box>
                                  <AppTooltip
                                    label={school.address}
                                    position="bottom-start"
                                  >
                                    <Text
                                      lineClamp={1}
                                      fz={14}
                                      c="mainText"
                                      fw={600}
                                    >
                                      {school.address}
                                    </Text>
                                  </AppTooltip>
                                  <Text fz={12} c="longText">
                                    {school.latitude}, {school.longitude}
                                  </Text>
                                </Box>
                              </Flex>
                            </Grid.Col>

                            <Grid.Col span={6}>
                              <Flex gap={4}>
                                <div>
                                  <User
                                    style={{ marginBottom: "-2px" }}
                                    weight="Linear"
                                    size="18"
                                  />
                                </div>
                                <Box>
                                  <AppTooltip
                                    label={school.school_head.name}
                                    position="bottom-start"
                                  >
                                    <Text
                                      lineClamp={1}
                                      fz={14}
                                      c="mainText"
                                      fw={600}
                                    >
                                      {school.school_head.name}
                                    </Text>
                                  </AppTooltip>
                                  <Text fz={12} c="longText">
                                    {school.school_head.position}
                                  </Text>
                                </Box>
                              </Flex>
                            </Grid.Col>

                            <Grid.Col span={6}>
                              <Flex gap={4}>
                                <div>
                                  <Phone
                                    style={{ marginBottom: "-2px" }}
                                    weight="Linear"
                                    size="18"
                                  />
                                </div>
                                <Box>
                                  <Text lineClamp={1} fz={14} c="longText">
                                    (02) 8123-4567
                                  </Text>
                                </Box>
                              </Flex>
                            </Grid.Col>

                            <Grid.Col span={6}>
                              <Flex gap={4}>
                                <div>
                                  <Calendar
                                    style={{ marginBottom: "-2px" }}
                                    weight="Linear"
                                    size="18"
                                  />
                                </div>
                                <Box>
                                  <Text lineClamp={1} fz={14} c="longText">
                                    Established {school.year_established}
                                  </Text>
                                </Box>
                              </Flex>
                            </Grid.Col>
                          </Grid>
                        </Box>
                      </Flex>
                    </Card>
                  </Grid.Col>
                ))}
            </Grid>
          </Tabs.Panel>
        ))
      )}
    </Tabs>
  );
};

export default SchoolsDirectoryTabs;
