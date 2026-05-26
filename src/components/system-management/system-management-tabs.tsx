import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";
import classes from "@/css/Tab.module.css";
import AccountTab from "./account/account-tab";
import ActivityTab from "./activity/activity-tab";
import SYManagementTab from "./sy-management/sy-management-tab";
import { useSearchParams } from "react-router";

const SystemManagementTabs = () => {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [value, setValue] = useState<string | null>(
    searchParams.get("tab") ?? "accounts",
  );
  const [controlsRefs, setControlsRefs] = useState<
    Record<string, HTMLButtonElement | null>
  >({});
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  return (
    <Tabs
      variant="none"
      value={value}
      onChange={(value) => {
        setValue(value);
        setSearchParams({ tab: value ?? "" });
      }}
    >
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
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="accounts">
        <AccountTab />
      </Tabs.Panel>
      <Tabs.Panel value="activity">
        <ActivityTab />
      </Tabs.Panel>
      <Tabs.Panel value="division-lead">ye</Tabs.Panel>
      <Tabs.Panel value="sy-management">
        <SYManagementTab />
      </Tabs.Panel>
    </Tabs>
  );
};

export default SystemManagementTabs;
