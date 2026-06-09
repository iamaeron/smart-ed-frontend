import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const EditPersonnelConfirmModal = () => {
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
          description="You are about to update this personnel’s information. Please review all details carefully."
          confirmText="Save"
          PopupIcon={InboxIn}
          formId="edit-personnel-form"
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

export default EditPersonnelConfirmModal;
