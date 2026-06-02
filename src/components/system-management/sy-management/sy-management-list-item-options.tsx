import Show from "@/components/show";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { ActionIcon, Menu } from "@mantine/core";
import { Archive, CheckCircle, MenuDots, Pen } from "@solar-icons/react";
import EditSYModal from "./edit-sy-modal";
import { useState } from "react";
import ArchiveSYConfirmModal from "./archive-sy-confirm-modal";

type Modals = "edit" | "archive" | "activate";

const SYManagementListItemOptions = ({ item }: { item: AcademicYear }) => {
  // const [modalOpened, { open, close }] = useDisclosure(false);
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
            leftSection={<Pen size={16} />}
          >
            Edit School Year
          </Menu.Item>
          <Show when={item.status === "active"}>
            <Menu.Item
              onClick={() => setActiveModal("archive")}
              color="red"
              leftSection={<Archive size={16} />}
            >
              Archive
            </Menu.Item>
          </Show>
          <Show when={item.status === "archived"}>
            <Menu.Item color="red" leftSection={<CheckCircle size={16} />}>
              Set as Active Year
            </Menu.Item>
          </Show>
        </Menu.Dropdown>
      </Menu>

      <EditSYModal
        sy={item}
        opened={activeModal === "edit"}
        onClose={() => setActiveModal(null)}
      />
      <ArchiveSYConfirmModal
        sy={item}
        opened={activeModal === "archive"}
        onClose={() => setActiveModal(null)}
      />
    </>
  );
};

export default SYManagementListItemOptions;
