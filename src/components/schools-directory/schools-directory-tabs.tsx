import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import {
  Center,
  Flex,
  FloatingIndicator,
  Grid,
  Skeleton,
  Tabs,
  Text,
} from "@mantine/core";
import classes from "@/css/Tab.module.css";
import { useLayoutEffect, useMemo, useState, useCallback } from "react";
import { useSearchParams } from "react-router";
import TabListScroller from "../tab-list-scroller";
import { motion, AnimatePresence } from "motion/react";
import SchoolCard from "./school-card";

const MotionGrid = motion.create(Grid);

// Define variants outside of the component so they are never recreated on re-render
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
} as const;

const SchoolsDirectoryTabs = ({ schools }: { schools: any[] }) => {
  const { data, isPending } = useFetchSchoolTypes();

  const baseTabs = useMemo(() => {
    if (!data?.results?.school_types) return [{ id: 543, name: "All" }];
    return [{ id: 543, name: "All" }, ...data.results.school_types];
  }, [data?.results?.school_types]);

  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string>(searchParams.get("tab") ?? "All");

  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});

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

  const mappedSchoolsByTab = useMemo(() => {
    if (!baseTabs || !schools) return {};
    const groups: Record<string, typeof schools> = {};

    baseTabs.forEach((tab: any) => {
      const tabValue = tab.name;
      groups[tabValue] = schools.filter(
        (s) => tabValue === "All" || s.school_type?.name === tabValue,
      );
    });

    return groups;
  }, [baseTabs, schools]);

  const tabSchools = mappedSchoolsByTab[value] || [];

  useLayoutEffect(() => {
    if (!isPending && baseTabs.length > 0) {
      setIsReady(true);
    }
  }, [baseTabs.length, isPending]);

  return (
    <Tabs
      keepMounted={false}
      variant="none"
      value={value}
      onChange={(val) => {
        const nextVal = val ?? "All";
        setValue(nextVal);
        setSearchParams({ tab: nextVal });
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
                  key={type.id}
                  value={type.name}
                  ref={setControlRef(type.name)}
                  className={classes.tab}
                >
                  <span>{type.name}</span>
                </Tabs.Tab>
              ))}
              {isReady && controlsRefs[value] && (
                <FloatingIndicator
                  target={controlsRefs[value]}
                  parent={rootRef}
                  className={classes.indicator}
                />
              )}
            </>
          )}
        </Tabs.List>
      </TabListScroller>

      {isPending || !baseTabs.length || !schools.length ? (
        <Grid gap="lg" mt={20}>
          {[1, 2, 3, 4].map((i) => (
            <Grid.Col key={i} span={6}>
              <Skeleton h={177} width="100%" />
            </Grid.Col>
          ))}
        </Grid>
      ) : tabSchools.length > 0 ? (
        baseTabs.map((type: any) => (
          <Tabs.Panel key={type.id} value={type.name}>
            <MotionGrid
              gap="lg"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {tabSchools.map((school) => (
                  <SchoolCard key={school.id} school={school} />
                ))}
              </AnimatePresence>
            </MotionGrid>
          </Tabs.Panel>
        ))
      ) : (
        <Center py="xl">
          <Text c="longText">No schools found.</Text>
        </Center>
      )}
    </Tabs>
  );
};

export default SchoolsDirectoryTabs;
