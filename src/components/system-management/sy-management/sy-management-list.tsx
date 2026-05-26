import type {
  AcademicYear,
  AcademicYearStatus,
} from "@/types/data/academic-year.type";
import { Badge, Table, TableScrollContainer, Text } from "@mantine/core";
import dayjs from "dayjs";
import SYManagementListItemOptions from "./sy-management-list-item-options";

const SYManagementList = ({ data }: { data: any }) => {
  const statusColors = {
    active: "green",
    default: "blue",
    archived: "gray",
    upcoming: "yellow",
  };

  const rows = data.map((element: AcademicYear) => (
    <Table.Tr key={element.year_id}>
      <Table.Td>
        <Text fz={14} c="longText">
          {dayjs(element.date_added).format("YYYY-MM-DD")}
        </Text>
      </Table.Td>
      <Table.Td>
        <Text fz={14} fw={500}>
          {element.academic_year}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge
          tt="capitalize"
          variant="outline"
          size="lg"
          color={statusColors[element.status as AcademicYearStatus]}
        >
          {element.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <SYManagementListItemOptions item={element} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <TableScrollContainer minWidth="100%">
      <Table horizontalSpacing={0} verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Date Added</Table.Th>
            <Table.Th>School Year</Table.Th>
            <Table.Th>Status</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </TableScrollContainer>
  );
};

export default SYManagementList;
