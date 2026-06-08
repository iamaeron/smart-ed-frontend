import { ActionIcon, AppShell, Burger, Container, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Sidebar, UserCircle } from "@solar-icons/react";
import AppSidebar from "@/components/sidebar";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const sidebarLSKey = "sme-sidebar-state";
  const [opened, { toggle }] = useDisclosure();
  const [desktopOpened, handlers] = useDisclosure(
    localStorage.getItem(sidebarLSKey)
      ? JSON.parse(localStorage.getItem(sidebarLSKey) ?? "")
      : true,
    {
      onOpen() {
        localStorage.setItem(sidebarLSKey, "true");
      },
      onClose() {
        localStorage.setItem(sidebarLSKey, "false");
      },
    },
  );

  const toggleDesktop = () => {
    if (!desktopOpened) {
      handlers.open();
    } else {
      handlers.close();
    }
  };

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
          transition: "width 200ms ease, min-width 200ms ease",
        },
        main: {
          transition: "padding-left 300ms ease",
        },
      }}
      padding="md"
    >
      <AppShell.Header px="lg" withBorder={false}>
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
              <Sidebar size={22} />
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
