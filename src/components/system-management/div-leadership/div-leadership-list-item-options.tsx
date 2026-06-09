import { ActionIcon, Menu } from "@mantine/core";
import { MenuDots } from "@solar-icons/react";
import { useState } from "react";
import { Delete3Line, Edit2Line } from "@mingcute/react";
import EditPersonnelModal from "./edit-personnel-modal";
import type { Personnel } from "@/types/data/personnel.type";
import DeletePersonnelConfirmModal from "./delete-personnel-confirm-modal";

type Modals = "edit" | "delete";

const DivisionLeadershipListItemOptions = ({ item }: { item: Personnel }) => {
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
            Edit Personnel Details
          </Menu.Item>
          <Menu.Item
            onClick={() => setActiveModal("delete")}
            leftSection={<Delete3Line size={18} />}
            color="red"
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      {activeModal === "edit" && (
        <EditPersonnelModal
          personnel={item}
          onClose={() => setActiveModal(null)}
          opened={true}
        />
      )}

      {activeModal === "delete" && (
        <DeletePersonnelConfirmModal
          personnel={item}
          onClose={() => setActiveModal(null)}
          opened={true}
        />
      )}
    </>
  );
};

export default DivisionLeadershipListItemOptions;
