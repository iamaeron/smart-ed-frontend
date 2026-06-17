import { Box, Button, Card, Group, Table, Text } from "@mantine/core";

export interface EnrollmentByGradeData {
  grade_level: string;
  total_female: string;
  total_male: string;
  total_students: string;
}

const EnrollmentByGradeLevel = ({ data }: { data: any }) => {
  const rows = data.levels.map((element: EnrollmentByGradeData) => (
    <Table.Tr key={element.grade_level}>
      <Table.Td width="100%">{element.grade_level}</Table.Td>
      <Table.Td pr={40} pl={50}>
        {element.total_male}
      </Table.Td>
      <Table.Td pr={40} pl={50}>
        {element.total_female}
      </Table.Td>
      <Table.Td pr={40} pl={50} fw={600}>
        {element.total_students}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card radius="lg" p="lg" shadow="sm">
      <Group justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            Enrollment By Grade Level
          </Text>
          <Text mb={18} c="longText" size="sm">
            Detailed breakdown of student enrollment per school and educational
            level
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
