import { useAuth } from "@/contexts/auth.context";
import { Box, Button, Card, Group, Table, Text } from "@mantine/core";
import { Link } from "react-router";

const ResourceSummary = ({
  summary = true,
  data,
}: {
  summary?: boolean;
  data?: { [k: string]: any };
}) => {
  const { user } = useAuth();
  const dummyTableData = [
    {
      resource_name: "Classrooms",
      total_inventory: 960,
      total_requirement: 1050,
      total_need: 90,
    },
    {
      resource_name: "Teachers",
      total_inventory: 1215,
      total_requirement: 1250,
      total_need: 35,
    },
    {
      resource_name: "Seats",
      total_inventory: 27000,
      total_requirement: 35420,
      total_need: 8420,
    },
    {
      resource_name: "Learning Materials",
      total_inventory: 31000,
      total_requirement: 35420,
      total_need: 4420,
    },
  ];

  const rows = (data ? data : dummyTableData).map((element: any) => (
    <Table.Tr key={element.resource_name}>
      <Table.Td w={summary ? "auto" : "100%"}>{element.resource_name}</Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
        {element.total_inventory}
      </Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
        {element.total_requirement}
      </Table.Td>
      <Table.Td pr={summary ? 0 : 40} pl={summary ? 0 : 50} fw={600}>
        {element.total_need}
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
          <Button
            component={Link}
            to={`/${user?.role.toLowerCase().replace(" ", "-")}/${user?.role.split(" ")[0].toLowerCase()}-overview?tab=2`}
            mt={-12}
            p={0}
            variant="white"
            c="primary"
          >
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
