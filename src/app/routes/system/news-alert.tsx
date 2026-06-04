import TabListScroller from "@/components/tab-list-scroller";
import AppLayout from "@/layouts/app.layout";
import { Box, FloatingIndicator, Tabs, Text, Title } from "@mantine/core";
import classes from "@/css/Tab.module.css";
import { useCallback, useState } from "react";
import { useSearchParams } from "react-router";

const SystemAdminNews = () => {
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
      <Box mb={30}>
        <Text c="primary2">NEWS & ALERT</Text>
        <Title order={1} my={6}>
          Notifications & Announcements
        </Title>
        <Text c="grey">
          Stay updated with system alerts and division announcements
        </Text>
      </Box>

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
              Notifications
            </Tabs.Tab>
            <Tabs.Tab
              value="2"
              ref={setControlRef("2")}
              className={classes.tab}
            >
              Announcements
            </Tabs.Tab>

            <FloatingIndicator
              target={value ? controlsRefs[value] : null}
              parent={rootRef}
              className={classes.indicator}
            />
          </Tabs.List>
        </TabListScroller>

        <Tabs.Panel value="1">notif</Tabs.Panel>
        <Tabs.Panel value="2">anno</Tabs.Panel>
      </Tabs>
    </AppLayout>
  );
};

export default SystemAdminNews;
