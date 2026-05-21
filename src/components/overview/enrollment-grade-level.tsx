import { Box, Button, Card, Group, Table, Text } from "@mantine/core";

const EnrollmentByGradeLevel = () => {
  const dummyTableData = [
    {
      gradeLevel: "Kinder",
      male: 1390,
      female: 1460,
      total: 2850,
    },
    {
      gradeLevel: "Elementary",
      male: 10150,
      female: 10750,
      total: 20900,
    },
    {
      gradeLevel: "Junior High School",
      male: 4050,
      female: 4300,
      total: 8350,
    },
    {
      gradeLevel: "Senior High School",
      male: 1610,
      female: 1710,
      total: 3320,
    },
  ];

  const rows = dummyTableData.map((element) => (
    <Table.Tr key={element.gradeLevel}>
      <Table.Td width="100%">{element.gradeLevel}</Table.Td>
      <Table.Td pr={40} pl={50}>
        {element.male}
      </Table.Td>
      <Table.Td pr={40} pl={50}>
        {element.female}
      </Table.Td>
      <Table.Td pr={40} pl={50} fw={600}>
        {element.total}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card radius="lg" p="lg" shadow="sm">
      <Group justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            Resource Summary
          </Text>
          <Text mb={18} c="longText" size="sm">
            A summary of classrooms, teachers, seats, and learning materials
            across all schools in the division.
          </Text>
        </Box>

        <Button mt={-12} p={0} variant="white" c="primary">
          View all
        </Button>
      </Group>

      <Table horizontalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Grade Level</Table.Th>
            <Table.Th pr={40} pl={50}>
              Male
            </Table.Th>
            <Table.Th pr={40} pl={50}>
              Female
            </Table.Th>
            <Table.Th pr={40} pl={50}>
              Total
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default EnrollmentByGradeLevel;
