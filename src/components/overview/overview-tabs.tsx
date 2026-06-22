import { FloatingIndicator, Tabs } from "@mantine/core";
import classes from "@/css/Tab.module.css";
import EnrollmentTab from "./enrollment-tab";
import ResourceTab from "./resource-tab";
import KPITab from "./kpi-tab";
import TabListScroller from "../tab-list-scroller";
import useTabs from "@/hooks/use-tabs";

const OverviewTabs = () => {
  const { handleSwitchTab, value, setControlRef, setRootRef, target, rootRef } =
    useTabs("1");

  return (
    <Tabs
      keepMounted={true}
      variant="none"
      value={value}
      onChange={handleSwitchTab}
    >
      <TabListScroller>
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
            target={target}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>
      </TabListScroller>

      <Tabs.Panel value="1">
        <EnrollmentTab />
      </Tabs.Panel>
      <Tabs.Panel value="2">
        <ResourceTab />
      </Tabs.Panel>
      <Tabs.Panel value="3">
        <KPITab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default OverviewTabs;
