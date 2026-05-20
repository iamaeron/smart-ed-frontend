import {
  ActionIcon,
  AppShell,
  Burger,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import logo from "@/assets/smarted-logo.png";
import SidebarLink from "@/components/sidebar/sidebar-link";
import {
  Bell,
  Chart,
  FileCheck,
  SidebarMinimalistic,
  SquareAcademicCap,
  UserCircle,
  UsersGroupRounded,
  Widget,
} from "@solar-icons/react";
import LogOutModal from "@/components/sidebar/log-out-modal";

const SystemAdminAppLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      header={{ height: 60 }}
      navbar={{
        width: desktopOpened ? 280 : 80,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={{
        navbar: {
          transition: "width 300ms ease, min-width 300ms ease",
        },
        main: {
          transition: "padding-left 300ms ease",
        },
      }}
      padding="md"
    >
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md" justify="space-between">
          <Group>
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />
            <ActionIcon
              onClick={toggleDesktop}
              visibleFrom="sm"
              variant="subtle"
              color="gray"
            >
              <SidebarMinimalistic size={22} />
            </ActionIcon>
          </Group>

          <Group>
            <ActionIcon variant="subtle" color="gray">
              <UserCircle size={22} />
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar style={{ overflow: "hidden" }} p="md">
        <Group px={8} pb={26}>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Flex align="center" gap={10} style={{ whiteSpace: "nowrap" }}>
            <Image src={logo} w={30} h={30} />
            {desktopOpened ? (
              <Text size="lg" c="primary2" fw={600}>
                SMART Ed
              </Text>
            ) : null}
          </Flex>
        </Group>
        <AppShell.Section grow>
          <Stack gap={6} style={{ whiteSpace: "nowrap" }}>
            <SidebarLink
              label="Dashboard"
              to="/system-admin/dashboard"
              icon={Widget}
              collapsed={!desktopOpened}
            />
            <SidebarLink
              label="Division Overview"
              to="/system-admin/division-overview"
              icon={Chart}
              collapsed={!desktopOpened}
            />
            <SidebarLink
              label="Schools Directory"
              to="/system-admin/division-overview"
              icon={SquareAcademicCap}
              collapsed={!desktopOpened}
            />
            <SidebarLink
              label="News & Alert"
              to="/system-admin/division-overview"
              icon={Bell}
              collapsed={!desktopOpened}
            />
            <SidebarLink
              label="Submissions"
              to="/system-admin/division-overview"
              icon={FileCheck}
              collapsed={!desktopOpened}
            />
            <SidebarLink
              label="System Management"
              to="/system-admin/division-overview"
              icon={UsersGroupRounded}
              collapsed={!desktopOpened}
            />
          </Stack>
        </AppShell.Section>
        <AppShell.Section p="0">
          <LogOutModal />
        </AppShell.Section>
      </AppShell.Navbar>
      <AppShell.Main bg="lightBackground">{children}</AppShell.Main>
    </AppShell>
  );
};

export default SystemAdminAppLayout;
