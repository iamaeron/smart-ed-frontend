import { ActionIcon, AppShell, Burger, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { SidebarMinimalistic, UserCircle } from "@solar-icons/react";
import AppSidebar from "@/components/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
    <AppShell
      p="lg"
      bg="lightBackground"
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
      <AppSidebar
        desktopOpened={desktopOpened}
        opened={opened}
        toggle={toggle}
      />
      <AppShell.Main pb={80}>{children}</AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
