import {
  Badge,
  Box,
  Center,
  Flex,
  Paper,
  Table,
  TableScrollContainer,
  Text,
} from "@mantine/core";

const ActivityList = ({ data, page }: { data: any; page: number }) => {
  const rows = data.map((element: any) => {
    const uniqueId = `${element.id}-${page}`;

    return (
      <Table.Tr key={uniqueId}>
        <Table.Td>
          <Text fz={14} c="longText">
            {element.datetime}
          </Text>
        </Table.Td>
        <Table.Td>
          <Flex align="center" gap={8}>
            <Box>
              <Text fz={14} fw={500}>
                {element.user.name}
              </Text>
              {/* <Text fz={14} c="longText">
              @{element.username}
            </Text> */}
            </Box>
          </Flex>
        </Table.Td>
        <Table.Td>
          <Badge tt="capitalize" variant="outline" size="lg" color="blue">
            {element.log_name}
          </Badge>
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
            <Table.Th w="25%">Timestamp</Table.Th>
            <Table.Th w="25%">User</Table.Th>
            <Table.Th w="15%">Action</Table.Th>
            <Table.Th w="35%">Section</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </TableScrollContainer>
  );
};

export default ActivityList;
