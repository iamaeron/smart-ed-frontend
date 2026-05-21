import { AppShell, Burger, Flex, Group, Image, Text } from "@mantine/core";
import LogOutModal from "./log-out-modal";
import logo from "@/assets/smarted-logo.png";
import SidebarLinksContainer from "./sidebar-links-container";

type AppSidebarProps = {
  opened: boolean;
  desktopOpened: boolean;
  toggle: () => void;
};

const AppSidebar = ({ opened, desktopOpened, toggle }: AppSidebarProps) => {
  return (
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
      <SidebarLinksContainer desktopOpened={desktopOpened} />
      <AppShell.Section p="0">
        <LogOutModal />
      </AppShell.Section>
    </AppShell.Navbar>
  );
};

export default AppSidebar;
