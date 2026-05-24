import { FloatingIndicator, Tabs } from "@mantine/core";
import { useState } from "react";
import classes from "@/css/Tab.module.css";
import AccountTab from "./account-tab";

const SystemManagementTabs = () => {
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
          Accounts
        </Tabs.Tab>
        <Tabs.Tab value="2" ref={setControlRef("2")} className={classes.tab}>
          Activity
        </Tabs.Tab>
        <Tabs.Tab value="3" ref={setControlRef("3")} className={classes.tab}>
          Division Leadership
        </Tabs.Tab>
        <Tabs.Tab value="4" ref={setControlRef("4")} className={classes.tab}>
          School Year Management
        </Tabs.Tab>

        <FloatingIndicator
          target={value ? controlsRefs[value] : null}
          parent={rootRef}
          className={classes.indicator}
        />
      </Tabs.List>

      <Tabs.Panel value="1">
        <AccountTab />
      </Tabs.Panel>
      <Tabs.Panel value="2">yo</Tabs.Panel>
      <Tabs.Panel value="3">ye</Tabs.Panel>
      <Tabs.Panel value="4">Third tab content</Tabs.Panel>
    </Tabs>
  );
};

export default SystemManagementTabs;
