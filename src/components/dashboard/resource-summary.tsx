import { useAuth } from "@/contexts/auth.context";
import {
  Box,
  Button,
  Card,
  Center,
  Group,
  Skeleton,
  Table,
  Text,
} from "@mantine/core";
import { Link } from "react-router";
import EditSchoolResourcesDataModal from "../school/edit-school-resources-data-modal";
import { useAcademicYearStore } from "@/stores/academic-year.store";

const ResourceSummary = ({
  summary = true,
  data,
  loading,
}: {
  summary?: boolean;
  data: { [k: string]: any };
  loading?: boolean;
}) => {
  const { user } = useAuth();
  const selectedYearStatus = useAcademicYearStore((state) => state.yearStatus);

  const paddingStyles = {
    pr: summary ? 0 : 40,
    pl: summary ? 0 : 50,
  };

  const skeleton = Array(4)
    .fill(1)
    .map((_, i) => (
      <Table.Tr key={i}>
        <Table.Td w={summary ? "auto" : "100%"}>
          <Skeleton h={22} w={150} />
        </Table.Td>
        <Table.Td {...paddingStyles}>
          <Skeleton h={22} w={50} />
        </Table.Td>
        <Table.Td {...paddingStyles}>
          <Skeleton h={22} w={50} />
        </Table.Td>
        <Table.Td {...paddingStyles} fw={600}>
          <Skeleton h={22} w={50} />
        </Table.Td>
      </Table.Tr>
    ));

  const rows = data.map((element: any) => (
    <Table.Tr key={element.id}>
      <Table.Td w={summary ? "auto" : "100%"}>{element.resource_name}</Table.Td>
      <Table.Td {...paddingStyles}>{element.inventory}</Table.Td>
      <Table.Td {...paddingStyles}>{element.requirement}</Table.Td>
      <Table.Td {...paddingStyles} fw={600}>
        {element.need}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Card radius="lg" p="lg" shadow="sm">
      <Group mb={18} justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            {summary ? "Resource Summary" : "Resource Management"}
          </Text>
          <Text c="longText" size="sm">
            {summary
              ? "A summary of classrooms, teachers, seats, and learning materials across all schools in the division."
              : "Monitor and manage school resources"}
          </Text>
        </Box>

        {summary ? (
          <Button
            component={Link}
            to={`/${user?.role.toLowerCase().replace(" ", "-")}/${user?.role === "School Account" ? "school" : "division"}-overview?tab=2`}
            mt={-12}
            p={0}
            variant="white"
            c="primary"
          >
            View all
          </Button>
        ) : null}

        {user?.role === "School Account" &&
          selectedYearStatus === "default" &&
          typeof loading === "boolean" &&
          !summary && (
            <EditSchoolResourcesDataModal data={data} loading={loading} />
          )}
      </Group>

      <Table layout="fixed" horizontalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th w="56%">Resources</Table.Th>
            <Table.Th w="18%" pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Inventory
            </Table.Th>
            <Table.Th w="18%" pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Requirement
            </Table.Th>
            <Table.Th w="18%" pr={summary ? 0 : 40} pl={summary ? 0 : 50}>
              Need
            </Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {loading ? (
            skeleton
          ) : data.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={4}>
                <Center py="xl" c="longText">
                  No resources available for this S.Y.
                </Center>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </Card>
  );
};

export default ResourceSummary;
