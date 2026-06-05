import TabListScroller from "@/components/tab-list-scroller";
import { FloatingIndicator, Tabs } from "@mantine/core";
import classes from "@/css/Tab.module.css";
import useTabs from "@/hooks/use-tabs";

const NewsAlertTabs = () => {
  const { handleSwitchTab, value, setControlRef, setRootRef, target, rootRef } =
    useTabs("1");

  return (
    <Tabs variant="none" value={value} onChange={handleSwitchTab}>
      <TabListScroller>
        <Tabs.List ref={setRootRef} className={classes.list}>
          <Tabs.Tab value="1" ref={setControlRef("1")} className={classes.tab}>
            Notifications
          </Tabs.Tab>
          <Tabs.Tab value="2" ref={setControlRef("2")} className={classes.tab}>
            Announcements
          </Tabs.Tab>

          <FloatingIndicator
            target={target}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>
      </TabListScroller>

      <Tabs.Panel value="1">notif</Tabs.Panel>
      <Tabs.Panel value="2">anno</Tabs.Panel>
    </Tabs>
  );
};

export default NewsAlertTabs;
