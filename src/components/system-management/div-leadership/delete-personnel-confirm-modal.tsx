import { Modal } from "@mantine/core";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";
import type { EditPersonnelModalProps } from "./edit-personnel-modal";

const DeletePersonnelConfirmModal = ({
  personnel,
  onClose,
  opened,
}: EditPersonnelModalProps) => {
  const queryClient = useQueryClient();

  const handleArchive = async () => {
    try {
      const res = await api.delete(`/api/division-leaderships/${personnel.id}`);
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
          title="Delete Personnel?"
          description="You are about to remove a personnel. This will delete all of their information and will no longer be available after this."
          confirmText="Archive"
          onConfirm={handleArchive}
          onClose={onClose}
          type="warning"
        />
      </Modal>
    </>
  );
};

export default DeletePersonnelConfirmModal;
