import { useFetchKPI } from "@/lib/fetcher/kpi.fetcher";
import {
  Box,
  Card,
  Text,
  Table,
  Group,
  Flex,
  Button,
  Skeleton,
} from "@mantine/core";
import AcademicYearPicker from "../dashboard/academic-year-picker";
import { useAcademicYearStore } from "@/stores/academic-year.store";
import { keepPreviousData } from "@tanstack/react-query";
import ListPending from "../list-pending";
import { useState } from "react";
import KPISchoolTypePicker from "./kpi-school-type-picker";
import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";

const KPIManagement = () => {
  const { data: schoolTypes, isPending: isSchoolTypesPending } =
    useFetchSchoolTypes();
  const [schoolType, setSchoolType] = useState("");
  const selectedYear = useAcademicYearStore((state) => state.selectedYear);
  const { data, isPending, isPlaceholderData } = useFetchKPI(
    {
      academic_year_id: selectedYear,
      school_type: schoolType,
    },
    { placeholderData: keepPreviousData },
  );

  const kpiManagementData = data?.results?.data;

  const rows = kpiManagementData?.map((kpi: any) => (
    <Table.Tr key={kpi.id}>
      <Table.Td>{kpi.kpi_rate.name}</Table.Td>
      <Table.Td>{kpi.male}%</Table.Td>
      <Table.Td>{kpi.female}%</Table.Td>
      <Table.Td fw={700}>{kpi.total}%</Table.Td>
    </Table.Tr>
  ));

  return (
    <Card p="lg" shadow="xl" radius="lg">
      <Flex mb={20} align="flex-end" justify="space-between">
        <Box>
          <Text mb={2} fw={600}>
            KPI Management
          </Text>
          <Text c="longText" size="sm">
            Monitor and manage school resources
          </Text>
        </Box>

        <Group>
          {isSchoolTypesPending ? (
            <Skeleton h={36} w={150} radius="sm" />
          ) : (
            <KPISchoolTypePicker
              data={schoolTypes.results.school_types}
              callbackFn={(v) => setSchoolType(v)}
            />
          )}

          <AcademicYearPicker theme="outlined" />

          <Button variant="outline" color="blue">
            Edit
          </Button>
        </Group>
      </Flex>
      {isPending ? (
        <Skeleton h={330} w="100%" />
      ) : (
        <ListPending pending={isPlaceholderData}>
          <Table layout="fixed" horizontalSpacing={0}>
            <Table.Thead>
              <Table.Tr>
                <Table.Th w={"60%"}>KPI</Table.Th>
                <Table.Th w={"13%"}>Male</Table.Th>
                <Table.Th w={"13%"}>Female</Table.Th>
                <Table.Th w={"13%"}>Total</Table.Th>
              </Table.Tr>
            </Table.Thead>

            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </ListPending>
      )}
    </Card>
  );
};

export default KPIManagement;
