import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const EditAccountConfirmModal = () => {
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
          title="Apply Changes?"
          description="Changes made to this account will be saved and applied across the system."
          confirmText="Save"
          formId="edit-account-form"
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

export default EditAccountConfirmModal;
