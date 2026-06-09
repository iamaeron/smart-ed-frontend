import Show from "@/components/show";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { ActionIcon, Menu } from "@mantine/core";
import { MenuDots } from "@solar-icons/react";
import EditSYModal from "./edit-sy-modal";
import { useState } from "react";
import ArchiveSYConfirmModal from "./archive-sy-confirm-modal";
import ActivateSYConfirmModal from "./activate-sy-confirm-modal";
import { ArchiveLine, CheckCircleLine, Edit2Line } from "@mingcute/react";

type Modals = "edit" | "archive" | "activate";

const SYManagementListItemOptions = ({ item }: { item: AcademicYear }) => {
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
          <Menu.Label>{item.academic_year}</Menu.Label>
          <Menu.Item
            onClick={() => setActiveModal("edit")}
            leftSection={<Edit2Line size={18} />}
          >
            Edit School Year
          </Menu.Item>
          <Show when={item.status === "active"}>
            <Menu.Item
              onClick={() => setActiveModal("archive")}
              color="red"
              leftSection={<ArchiveLine size={18} />}
            >
              Archive Year
            </Menu.Item>
          </Show>
          <Show when={item.status === "archived"}>
            <Menu.Item
              onClick={() => setActiveModal("activate")}
              color="red"
              leftSection={<CheckCircleLine size={18} />}
            >
              Set as Active Year
            </Menu.Item>
          </Show>
        </Menu.Dropdown>
      </Menu>

      {activeModal === "edit" && (
        <EditSYModal
          sy={item}
          onClose={() => setActiveModal(null)}
          opened={true}
        />
      )}

      {activeModal === "archive" && (
        <ArchiveSYConfirmModal
          sy={item}
          opened={true}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "activate" && (
        <ActivateSYConfirmModal
          sy={item}
          opened={true}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
};

export default SYManagementListItemOptions;
