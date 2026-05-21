import { useAuth } from "@/contexts/auth.context";
import {
  divisionAdminNavLinks,
  schoolAdminNavLinks,
  systemAdminNavLinks,
} from "@/lib/nav-links";
import { useMemo } from "react";
import SidebarLink from "./sidebar-link";
import { AppShell, Skeleton, Stack } from "@mantine/core";

const SidebarLinksContainer = ({
  desktopOpened,
}: {
  desktopOpened: boolean;
}) => {
  const { user, isLoading } = useAuth();

  const currentNavLinks = useMemo(() => {
    if (!user?.role) return [];

    switch (user.role) {
      case "System Admin":
        return systemAdminNavLinks;
      case "School Admin":
        return schoolAdminNavLinks;
      default:
        return divisionAdminNavLinks;
    }
  }, []);

  return (
    <AppShell.Section grow>
      <Stack gap={6} style={{ whiteSpace: "nowrap" }}>
        {isLoading ? (
          <>
            <Skeleton height={30} radius="" />
            <Skeleton height={30} radius="" />
            <Skeleton height={30} radius="" />
          </>
        ) : (
          currentNavLinks.map((navLink, i) => (
            <SidebarLink
              key={i}
              label={navLink.label}
              to={navLink.to}
              icon={navLink.icon}
              collapsed={!desktopOpened}
            />
          ))
        )}
      </Stack>
    </AppShell.Section>
  );
};

export default SidebarLinksContainer;
