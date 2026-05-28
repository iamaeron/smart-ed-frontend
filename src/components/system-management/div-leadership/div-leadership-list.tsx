import { Table, TableScrollContainer, Text } from "@mantine/core";

const DivisionLeadershipList = ({
  data,
  page,
}: {
  data: any;
  page?: number;
}) => {
  const rows = data.map((element: any) => {
    const uniqueId = `${element.id}-${page}`;

    return (
      <Table.Tr key={uniqueId}>
        <Table.Td>
          <Text fz={14} fw={500} c="mainText">
            {element.name}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz={14} fw={500} c="mainText">
            {element.position}
          </Text>
        </Table.Td>
        <Table.Td>
          <Text fz={14} fw={500} c="mainText">
            {element.term_start} - {element.term_end_display}
          </Text>
        </Table.Td>
        <Table.Td>{element.description}</Table.Td>
      </Table.Tr>
    );
  });

  return (
    <TableScrollContainer minWidth="100%">
      <Table key={page} horizontalSpacing={0} verticalSpacing="xs">
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Name</Table.Th>
            <Table.Th>Position</Table.Th>
            <Table.Th>Service Period</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </TableScrollContainer>
  );
};

export default DivisionLeadershipList;
