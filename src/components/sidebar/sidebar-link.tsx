import { useAuth } from "@/contexts/auth.context";
import { Indicator, NavLink, Tooltip } from "@mantine/core";
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
  const { user } = useAuth();
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
      <Indicator
        disabled={
          !user?.returned_submissions ||
          user.returned_submissions.length <= 0 ||
          label !== "Submissions"
        }
        styles={{
          indicator: {
            transition: "all 200ms ease",
            minWidth: collapsed ? 8 : 14,
            width: collapsed ? 8 : "auto",
            padding: collapsed ? 0 : "0 4px",
            overflow: "hidden",
          },
        }}
        inline
        position={collapsed ? "top-end" : "middle-end"}
        offset={collapsed ? 3 : 20}
        size={collapsed ? 8 : 14}
        label={
          <span
            style={{
              opacity: collapsed ? 0 : 1,
              transition: "opacity 150ms ease",
            }}
          >
            {user?.returned_submissions?.length}
          </span>
        }
        color="subRed"
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
          py={6}
        />
      </Indicator>
    </Tooltip>
  );
};

export default SidebarLink;
