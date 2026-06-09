import { Modal } from "@mantine/core";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";
import type { EditAccountModalProps } from "./edit-account-modal";

const ToggleAccountStatusConfirmModal = ({
  account,
  onClose,
  opened,
}: EditAccountModalProps) => {
  const queryClient = useQueryClient();

  const handleToggle = async () => {
    try {
      const res = await api.post(`/api/users/${account.user_id}/change-status`);
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["user_accounts", {}] });
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
          title={`${account.is_active ? "Deactivate" : "Activate"} Account?`}
          description={`This will ${account.is_active ? "disable" : "grant"} the user access to the system. Please confirm that all account details are correct before proceeding.`}
          confirmText={account.is_active ? "Deactivate" : "Activate"}
          onConfirm={handleToggle}
          onClose={onClose}
          type="warning"
        />
      </Modal>
    </>
  );
};

export default ToggleAccountStatusConfirmModal;
