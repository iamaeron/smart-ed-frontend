import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Flex, Modal, Paper, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const EditSYConfirmModal = () => {
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
        <ConfirmPopupUI
          title="Save Changes?"
          description="You are about to update this school year's information. Please review all details carefully."
          PopupIcon={InboxIn}
          confirmText="Confirm"
          formId="edit-academic-year-form"
          onClose={close}
          type="info"
        />
      </Modal>
      <Button
        onClick={open}
        tt="uppercase"
        color="primary"
        fullWidth
        type="button"
      >
        Save
      </Button>
    </>
  );
};

export default EditSYConfirmModal;
