import { FloatingIndicator, Tabs } from "@mantine/core";
import classes from "@/css/Tab.module.css";
import AccountTab from "./account/account-tab";
import ActivityTab from "./activity/activity-tab";
import SYManagementTab from "./sy-management/sy-management-tab";
import DivisionLeadershipTab from "./div-leadership/div-leadership-tab";
import TabListScroller from "../tab-list-scroller";
import useTabs from "@/hooks/use-tabs";

const SystemManagementTabs = () => {
  const { handleSwitchTab, value, setControlRef, setRootRef, target, rootRef } =
    useTabs("accounts");

  return (
    <Tabs variant="none" value={value} onChange={handleSwitchTab}>
      <TabListScroller>
        <Tabs.List ref={setRootRef} className={classes.list}>
          <Tabs.Tab
            value="accounts"
            ref={setControlRef("accounts")}
            className={classes.tab}
          >
            Accounts
          </Tabs.Tab>
          <Tabs.Tab
            value="activity"
            ref={setControlRef("activity")}
            className={classes.tab}
          >
            Activity
          </Tabs.Tab>
          <Tabs.Tab
            value="division-lead"
            ref={setControlRef("division-lead")}
            className={classes.tab}
          >
            Division Leadership
          </Tabs.Tab>
          <Tabs.Tab
            value="sy-management"
            ref={setControlRef("sy-management")}
            className={classes.tab}
          >
            School Year Management
          </Tabs.Tab>

          <FloatingIndicator
            target={target}
            parent={rootRef}
            className={classes.indicator}
          />
        </Tabs.List>
      </TabListScroller>

      <Tabs.Panel value="accounts">
        <AccountTab />
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        <ActivityTab />
      </Tabs.Panel>
      <Tabs.Panel value="division-lead">
        <DivisionLeadershipTab />
      </Tabs.Panel>
      <Tabs.Panel value="sy-management">
        <SYManagementTab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SystemManagementTabs;
