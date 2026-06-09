import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const EditAccountPasswordConfirmModal = () => {
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
          title="Change Password?"
          description="You are about to change your password. Please review all changes carefully before proceeding"
          confirmText="Save"
          formId="edit-account-password-form"
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

export default EditAccountPasswordConfirmModal;
