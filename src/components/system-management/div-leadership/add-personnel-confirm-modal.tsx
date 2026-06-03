import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
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
        <ConfirmPopupUI
          title="Add New Personnel?"
          description="You are about to add a new personnel record. Please ensure all information is accurate before proceeding."
          confirmText="Confirm"
          PopupIcon={InboxIn}
          formId="new-personnel-form"
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
        Save changes
      </Button>
    </>
  );
};

export default AddPersonnelConfirmModal;
