import { Modal } from "@mantine/core";
import type { EditSYModalProps } from "./edit-sy-modal";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";

const ArchiveSYConfirmModal = ({ sy, onClose, opened }: EditSYModalProps) => {
  const queryClient = useQueryClient();

  const handleArchive = async () => {
    try {
      const res = await api.post(
        `/api/academic-years/${sy.year_id}/change-status`,
        { status: "archived" },
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
          title="Archive Year?"
          description="This school year will be removed from dashboards and reports and will no longer be visible or editable."
          confirmText="Archive"
          onConfirm={handleArchive}
          onClose={onClose}
          type="warning"
        />
      </Modal>
    </>
  );
};

export default ArchiveSYConfirmModal;
