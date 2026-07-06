import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { api } from "@/lib/api";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PenNewRound } from "@solar-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const RequestEditDataConfirmModal = ({
  disabled = false,
  subId,
}: {
  disabled?: boolean;
  subId: string;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    try {
      const res = await api.post(`/api/submissions/${subId}/edit-request`);
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        toast(res.data.message);
        close();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

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
          onConfirm={handleConfirm}
          title="Request Edit Permission?"
          description="This will notify your division administrator that you need to unlock this data. You'll be able to make changes once they approve your request."
          confirmText="Confirm"
          PopupIcon={PenNewRound}
          //   formId="edit-school-data-form"
          onClose={close}
          type="info"
        />
      </Modal>
      <Button
        onClick={open}
        disabled={disabled}
        tt="uppercase"
        color="primary"
        type="button"
      >
        Request Edit Permission
      </Button>
    </>
  );
};

export default RequestEditDataConfirmModal;
