import { Box, Center, Flex, Group, Paper, Table, Text } from "@mantine/core";
import { Letter, MenuDots, Phone } from "@solar-icons/react";

const AccountList = ({ data }: { data: any }) => {
  console.log(data);
  const rows = data.map((element: any) => (
    <Table.Tr key={element.id}>
      <Table.Td>
        <Flex align="center" gap={14}>
          <Center
            component={Paper}
            bdrs={999}
            bg="#DBEAFE"
            c="#1447E6"
            fw={600}
            w={35}
            h={35}
          >
            {element.name[0]}
          </Center>
          <Box>
            <Text fz={14} fw={500}>
              {element.name}
            </Text>
            <Text fz={14} c="longText">
              @{element.username}
            </Text>
          </Box>
        </Flex>
      </Table.Td>
      <Table.Td c="longText">
        <Box>
          <Group gap={8}>
            <Letter size={16} />
            <Text fz={14}>{element.email}</Text>
          </Group>
          <Group gap={8}>
            <Phone size={16} />
            <Text fz={14}>{element.phone_number}</Text>
          </Group>
        </Box>
      </Table.Td>
      <Table.Td>{element.role}</Table.Td>
      <Table.Td>
        <Box>
          <Text fz={14} fw={element.school.school_id ? 500 : 400}>
            {element.school.school_name}
          </Text>
          {element.school.school_id ? (
            <Text fz={14} c="longText">
              ID: {element.school.school_code}
            </Text>
          ) : null}
        </Box>
      </Table.Td>
      <Table.Td>
        <MenuDots weight="Bold" size={20} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table horizontalSpacing={0} verticalSpacing="xs">
      <Table.Thead>
        <Table.Tr>
          <Table.Th>User</Table.Th>
          <Table.Th>Contact</Table.Th>
          <Table.Th>Role</Table.Th>
          <Table.Th>School/Assignment</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default AccountList;
