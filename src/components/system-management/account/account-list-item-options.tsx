import { ActionIcon, Menu } from "@mantine/core";
import { MenuDots } from "@solar-icons/react";
import { useState } from "react";
import type { User } from "@/stores/auth.store";
import EditAccountModal from "./edit-account-modal";
import EditAccountPasswordModal from "./edit-account-password-modal";
import ToggleAccountStatusConfirmModal from "./toggle-account-status-confirm-modal";
import { useAuth } from "@/contexts/auth.context";
import {
  CheckCircleLine,
  CloseCircleLine,
  Edit2Line,
  LockLine,
} from "@mingcute/react";

type Modals = "edit" | "change_pass" | "toggle_status";

const AccountListItemOptions = ({ item }: { item: User }) => {
  const { user } = useAuth();
  const [activeModal, setActiveModal] = useState<Modals | null>(null);

  return (
    <>
      <Menu position="bottom-end" shadow="xl">
        <Menu.Target>
          <ActionIcon variant="subtle" color="gray">
            <MenuDots weight="Bold" size={20} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{item.name}</Menu.Label>
          <Menu.Item
            onClick={() => setActiveModal("edit")}
            leftSection={<Edit2Line size={18} />}
          >
            Edit Account Details
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveModal("change_pass")}
            leftSection={<LockLine size={18} />}
          >
            Change Password
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveModal("toggle_status")}
            color="red"
            disabled={item.user_id === user?.user_id}
            leftSection={
              item.is_active ? (
                <CloseCircleLine size={18} />
              ) : (
                <CheckCircleLine size={18} />
              )
            }
          >
            {item.is_active ? "Deactivate" : "Activate"} Account
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <EditAccountModal
        account={item}
        onClose={() => setActiveModal(null)}
        opened={activeModal === "edit"}
      />

      {activeModal === "change_pass" && (
        <EditAccountPasswordModal
          account={item}
          onClose={() => setActiveModal(null)}
          opened={true}
        />
      )}

      {activeModal === "toggle_status" && (
        <ToggleAccountStatusConfirmModal
          account={item}
          onClose={() => setActiveModal(null)}
          opened={true}
        />
      )}
    </>
  );
};

export default AccountListItemOptions;
