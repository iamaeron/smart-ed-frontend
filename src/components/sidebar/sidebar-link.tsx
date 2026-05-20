import { NavLink } from "@mantine/core";
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
      label={collapsed ? "" : label}
      color={isActive ? "#2C68FF" : "#111111"}
      variant={isActive ? "light" : "default"}
      active={isActive}
      className="nv"
      py="6px"
    />
  );
};

export default SidebarLink;
