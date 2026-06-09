import { Modal } from "@mantine/core";
import type { EditSYModalProps } from "./edit-sy-modal";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";

const ActivateSYConfirmModal = ({ sy, onClose, opened }: EditSYModalProps) => {
  const queryClient = useQueryClient();

  const handleActivate = async () => {
    try {
      const res = await api.post(
        `/api/academic-years/${sy.year_id}/change-status`,
        { status: "active" },
      );
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["academic_years", {}] });
        toast(res.data.message);
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={onClose}
        size="md"
        centered
      >
        <ConfirmPopupUI
          title="Set as Active Year?"
          description="This will enable viewing access for this school year, but no changes can be made to its data."
          confirmText="Activate"
          onConfirm={handleActivate}
          onClose={onClose}
          type="warning"
        />
      </Modal>
    </>
  );
};

export default ActivateSYConfirmModal;
