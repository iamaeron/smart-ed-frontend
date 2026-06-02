import { Button, Flex, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const AddPersonnelConfirmModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="md"
        centered
      >
        <Paper p={6}>
          <Stack align="center" gap={10}>
            <div>
              <InboxIn color="#2c68ff" size={44} />
            </div>
            <Text size="xl" fw={700}>
              Add New Personnel?
            </Text>
            <Text size="sm" ta="center">
              <span style={{ fontWeight: 600 }}>Warning:</span> You are about to
              add a new personnel record. Please ensure all information is
              accurate before proceeding.
            </Text>
          </Stack>
          <Flex mt={20} gap={8}>
            <Button
              onClick={close}
              tt="uppercase"
              variant="outline"
              color="primary"
              type="button"
              c="primary"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="new-personnel-form"
              tt="uppercase"
              color="primary"
              fullWidth
            >
              Confirm
            </Button>
          </Flex>
        </Paper>
      </Modal>
      <Button
        onClick={open}
        tt="uppercase"
        color="primary"
        fullWidth
        type="button"
      >
        Save changes
      </Button>
    </>
  );
};

export default AddPersonnelConfirmModal;
