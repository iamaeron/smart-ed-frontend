import {
  Box,
  Card,
  Text,
  Table,
  Group,
  Flex,
  Select,
  Button,
} from "@mantine/core";
import { AltArrowDown } from "@solar-icons/react";

const dummyTableData = [
  {
    kpi: "Gross Enrollment Rate",
    male: "99.2%",
    female: "98.8%",
    total: "99%",
  },
  {
    kpi: "Net Enrollment Rate",
    male: "96.5%",
    female: "95.8%",
    total: "96.1%",
  },
  {
    kpi: "Transition Rate",
    male: "97%",
    female: "96.5%",
    total: "96.7%",
  },
  {
    kpi: "Retention Rate",
    male: "94.8%",
    female: "94.2%",
    total: "94.5%",
  },
  {
    kpi: "Completion Rate",
    male: "93.5%",
    female: "92.9%",
    total: "93.2%",
  },
  {
    kpi: "Promotion Rate",
    male: "95.8%",
    female: "95.4%",
    total: "95.6%",
  },
  {
    kpi: "Repetition Rate",
    male: "2.9%",
    female: "2.7%",
    total: "2.8%",
  },
  {
    kpi: "School Leaver Rate",
    male: "1.7%",
    female: "1.5%",
    total: "1.6%",
  },
];

const KPIManagement = () => {
  const rows = dummyTableData.map((item) => (
    <Table.Tr key={item.kpi}>
      <Table.Td>{item.kpi}</Table.Td>
      <Table.Td>{item.male}</Table.Td>
      <Table.Td>{item.female}</Table.Td>
      <Table.Td fw={700}>{item.total}</Table.Td>
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
          <Select
            placeholder="Pick value"
            defaultValue="Elementary"
            rightSection={<AltArrowDown size={16} />}
            data={["Elementary", "Angular", "Vue", "Svelte"]}
          />
          <Select
            placeholder="Pick value"
            defaultValue="S.Y. 2025-2026"
            rightSection={<AltArrowDown size={16} />}
            data={["S.Y. 2025-2026", "Angular", "Vue", "Svelte"]}
          />

          <Button variant="outline" color="blue">
            Edit
          </Button>
        </Group>
      </Flex>
      <Table horizontalSpacing={0}>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>KPI</Table.Th>
            <Table.Th>Male</Table.Th>
            <Table.Th>Female</Table.Th>
            <Table.Th>Total</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Card>
  );
};

export default KPIManagement;
