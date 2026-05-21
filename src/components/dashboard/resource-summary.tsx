import { Box, Button, Card, Group, Table, Text } from "@mantine/core";

const ResourceSummary = ({ summary = true }: { summary?: boolean }) => {
  const dummyTableData = [
    {
      resource: "Classrooms",
      inventory: 960,
      requirement: 1050,
      need: 90,
    },
    {
      resource: "Teachers",
      inventory: 1215,
      requirement: 1250,
      need: 35,
    },
    {
      resource: "Seats",
      inventory: 27000,
      requirement: 35420,
      need: 8420,
    },
    {
      resource: "Learning Materials",
      inventory: 31000,
      requirement: 35420,
      need: 4420,
    },
  ];

  const rows = dummyTableData.map((element) => (
    <Table.Tr key={element.resource}>
      <Table.Td w={summary ? "auto" : "100%"}>{element.resource}</Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
        {element.inventory}
      </Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
        {element.requirement}
      </Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50} fw={600}>
        {element.need}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card radius="lg" p="lg" shadow="sm">
      <Group justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            {summary ? "Resource Summary" : "Resource Management"}
          </Text>
          <Text mb={18} c="longText" size="sm">
            {summary
              ? "A summary of classrooms, teachers, seats, and learning materials across all schools in the division."
              : "Monitor and manage school resources"}
          </Text>
        </Box>

        {summary ? (
          <Button mt={-12} p={0} variant="white" c="primary">
            View all
          </Button>
        ) : null}
      </Group>

      <Table horizontalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Resources</Table.Th>
            <Table.Th pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Inventory
            </Table.Th>
            <Table.Th pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Requirement
            </Table.Th>
            <Table.Th pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Need
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default ResourceSummary;
