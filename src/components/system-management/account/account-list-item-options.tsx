import Show from "@/components/show";
import { ActionIcon, Menu } from "@mantine/core";
import {
  Archive,
  CheckCircle,
  Lock,
  MenuDots,
  Password,
  PasswordMinimalistic,
  PasswordMinimalisticInput,
  Pen,
} from "@solar-icons/react";
import { useState } from "react";
import type { User } from "@/stores/auth.store";

type Modals = "edit" | "change_pass" | "activate";

const AccountListItemOptions = ({ item }: { item: User }) => {
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
            leftSection={<Pen size={16} />}
          >
            Edit Account Details
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveModal("change_pass")}
            leftSection={<Lock size={16} />}
          >
            Change Password
          </Menu.Item>
          <Show when={!item.is_active}>
            <Menu.Item
              onClick={() => setActiveModal("activate")}
              color="red"
              leftSection={<CheckCircle size={16} />}
            >
              Activate Account
            </Menu.Item>
          </Show>
        </Menu.Dropdown>
      </Menu>
    </>
  );
};

export default AccountListItemOptions;
