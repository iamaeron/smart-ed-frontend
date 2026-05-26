import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Text, Stack, Flex, Paper } from "@mantine/core";
import { Logout2 } from "@solar-icons/react";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";

const LogOutModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { setUser } = useAuth();

  const handleLogOut = async () => {
    try {
      await api.post("/api/logout");
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        // title="Log out?"
        size="sm"
        centered
      >
        <Paper p={6}>
          <Stack align="center" gap={10}>
            <Text size="xl" fw={700}>
              Log Out?
            </Text>
            <Text size="sm" ta="center">
              You will be removed from your account. This action cannot be
              undone. Do you want to continue?
            </Text>
          </Stack>
          <Flex mt={20} gap={8}>
            <Button
              onClick={close}
              tt="uppercase"
              variant="outline"
              color="red"
              c="subRed"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleLogOut}
              tt="uppercase"
              color="subRed"
              fullWidth
            >
              Confirm
            </Button>
          </Flex>
        </Paper>
      </Modal>

      <Button
        justify="left"
        fullWidth
        onClick={open}
        variant="outline"
        leftSection={<Logout2 weight="BoldDuotone" size={20} />}
      >
        Log out
        {/* <span className="sidebar-logo-text">Log out</span> */}
      </Button>
    </>
  );
};

export default LogOutModal;
