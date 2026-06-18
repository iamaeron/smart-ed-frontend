import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const EditSchoolDataConfirmModal = () => {
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
          title="Submit For Review?"
          description="Your changes will be sent for review. Please double-check all entries."
          confirmText="Submit"
          PopupIcon={InboxIn}
          formId="edit-school-data-form"
          onClose={close}
          type="info"
        />
      </Modal>
      <Button onClick={open} tt="uppercase" color="primary" type="button">
        Save Changes
      </Button>
    </>
  );
};

export default EditSchoolDataConfirmModal;
