import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { Button, Card, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { InboxIn } from "@solar-icons/react";

const AddSYConfirmModal = ({ hasError }: { hasError: boolean }) => {
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
        {hasError ? (
          <Card bg="red.1" mb="lg">
            <Text size="sm" c="red.9">
              An error occurred while adding a new academic year. Please close
              this popup to check.
            </Text>
          </Card>
        ) : null}
        <ConfirmPopupUI
          title="Add New School Year?"
          description="The new school year will be visible to all modules. Please verify dates before proceeding."
          confirmText="Confirm"
          PopupIcon={InboxIn}
          formId="academic-year-form"
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

export default AddSYConfirmModal;
