import Show from "@/components/show";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { ActionIcon, Menu } from "@mantine/core";
import { Archive, CheckCircle, MenuDots, Pen } from "@solar-icons/react";

const SYManagementListItemOptions = ({ item }: { item: AcademicYear }) => {
  return (
    <Menu position="bottom-end" shadow="xl">
      <Menu.Target>
        <ActionIcon variant="subtle" color="gray">
          <MenuDots weight="Bold" size={20} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>{item.academic_year}</Menu.Label>
        <Menu.Item leftSection={<Pen size={16} />}>Edit School Year</Menu.Item>
        <Show when={item.status === "active"}>
          <Menu.Item color="red" leftSection={<Archive size={16} />}>
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
  );
};

export default SYManagementListItemOptions;
