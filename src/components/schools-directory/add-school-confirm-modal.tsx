import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const AddSchoolConfirmModal = () => {
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
          title="Add New School?"
          description="The new school will be added. Please verify all information before proceeding."
          confirmText="Confirm"
          PopupIcon={InboxIn}
          formId="new-school-form"
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

export default AddSchoolConfirmModal;
