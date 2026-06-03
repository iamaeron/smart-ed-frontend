import { Scroller, type ScrollerProps } from "@mantine/core";
import classes from "@/css/Tab.module.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const TabListScroller = ({ ...props }: ScrollerProps) => {
  return (
    <Scroller
      {...props}
      className={classes.scrollWrapper}
      startControlIcon={
        <div style={{ display: "flex", alignItems: "center" }}>
          <ChevronLeftIcon size={22} />
        </div>
      }
      endControlIcon={
        <div style={{ display: "flex", alignItems: "center" }}>
          <ChevronRightIcon size={22} />
        </div>
      }
      styles={{
        root: {
          "--scroller-background-color": "#eaeaff",
        },
        content: { width: "100%" },
        control: {
          zIndex: 40,
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      }}
    />
  );
};

export default TabListScroller;
