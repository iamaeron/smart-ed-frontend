import { useAuth } from "@/contexts/auth.context";
import { Box, Card, Group, Skeleton, Table, Text } from "@mantine/core";
import EditSchoolEnrollmentDataModal from "../school/edit-school-enrollment-data-modal";

export interface EnrollmentByGradeData {
  grade_level: string;
  total_female: string;
  total_male: string;
  total_students: string;
}

const EnrollmentByGradeLevel = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const { user } = useAuth();

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

  const skeleton = Array(5)
    .fill(1)
    .map((_, i) => (
      <Table.Tr key={i}>
        <Table.Td width="100%">
          <Skeleton h={22} w={150} />
        </Table.Td>
        <Table.Td pr={40} pl={50}>
          <Skeleton h={22} w={50} />
        </Table.Td>
        <Table.Td pr={40} pl={50}>
          <Skeleton h={22} w={50} />
        </Table.Td>
        <Table.Td pr={40} pl={50} fw={600}>
          <Skeleton h={22} w={50} />
        </Table.Td>
      </Table.Tr>
    ));

  return (
    <Card radius="lg" p="lg" shadow="sm">
      <Group mb={18} justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            Enrollment By Grade Level
          </Text>
          <Text c="longText" size="sm">
            Detailed breakdown of student enrollment per school and educational
            level
          </Text>
        </Box>

        {user?.role === "School Account" && (
          <EditSchoolEnrollmentDataModal data={data.levels} loading={loading} />
        )}
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
        <Table.Tbody>{loading ? skeleton : rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default EnrollmentByGradeLevel;
