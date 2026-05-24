import { NavLink, Tooltip } from "@mantine/core";
import type { Icon } from "@solar-icons/react/lib/types";
import { Link, useLocation } from "react-router";

interface SidebarLinkProps {
  label: string;
  icon: Icon;
  to: string;
  collapsed: boolean;
}

const SidebarLink = ({
  label,
  icon: Icon,
  to,
  collapsed = false,
}: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Tooltip
      label={label}
      style={{ fontSize: "13px" }}
      position="right"
      withArrow
      color="rgba(17, 16, 23, 0.8)"
      hidden={!collapsed}
    >
      <NavLink
        component={Link}
        to={to}
        h={36}
        styles={{
          label: {
            fontSize: "14px",
          },
        }}
        //   onClick={(event) => event.preventDefault()}
        style={{ fontWeight: "500", borderRadius: "8px" }}
        leftSection={
          <Icon
            size={22}
            weight={isActive ? "BoldDuotone" : "Outline"}
            // weight={"BoldDuotone"}
            color={isActive ? "#2C68FF" : "#3f3f46"}
          />
        }
        // label={collapsed ? " " : label}
        label={label}
        color={isActive ? "#2C68FF" : "#111111"}
        variant={isActive ? "light" : "default"}
        active={isActive}
        className={["nv sidebar-link", collapsed ? "hidden" : ""].join(" ")}
        py="6px"
      />
    </Tooltip>
  );
};

export default SidebarLink;
