import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";
import classes from "@/css/Overview.module.css";
import EnrollmentTab from "./enrollment-tab";
import ResourceTab from "./resource-tab";

const OverviewTabs = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [value, setValue] = useState<string | null>("1");
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs variant="none" value={value} onChange={setValue}>
      <Tabs.List ref={setRootRef} className={classes.list}>
        <Tabs.Tab value="1" ref={setControlRef("1")} className={classes.tab}>
          Enrollment
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef("2")} className={classes.tab}>
          Resources
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef("3")} className={classes.tab}>
          Key Performance Indicator
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">
        <EnrollmentTab />
      </Tabs.Panel>
      <Tabs.Panel value="2">
        <ResourceTab />
      </Tabs.Panel>
      <Tabs.Panel value="3">Third tab content</Tabs.Panel>
    </Tabs>
  );
};

export default OverviewTabs;
