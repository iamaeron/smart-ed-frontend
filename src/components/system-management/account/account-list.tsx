import {
  Badge,
  Box,
  Center,
  Flex,
  Group,
  Paper,
  Table,
  TableScrollContainer,
  Text,
} from "@mantine/core";
import { Letter, MenuDots, Phone } from "@solar-icons/react";
import Show from "../../show";

const AccountList = ({ data }: { data: any }) => {
  const badgeColors = {
    "System Admin": "green",
    "School Admin": "blue",
    "Division Admin": "red",
  };

  const rows = data.map((element: any) => (
    <Table.Tr key={element.user_id}>
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
      <Table.Td>
        <Show when={element.role}>
          <Badge
            tt="capitalize"
            variant="outline"
            size="lg"
            color={
              badgeColors[
                element.role as
                  | "System Admin"
                  | "Division Admin"
                  | "School Admin"
              ]
            }
          >
            {element.role}
          </Badge>
        </Show>
      </Table.Td>
      <Table.Td>
        <Box>
          <Show
            when={element.assignment.type === "school"}
            fallback={"Division Level"}
          >
            <Text fz={14} fw={element.assignment?.school_code ? 500 : 400}>
              {element.assignment.school_name}
            </Text>

            <Show when={element.assignment?.school_code}>
              <Text fz={14} c="longText">
                ID: {element.assignment.school_code}
              </Text>
            </Show>
          </Show>
        </Box>
      </Table.Td>
      <Table.Td>
        <MenuDots weight="Bold" size={20} />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <TableScrollContainer minWidth="100%">
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
    </TableScrollContainer>
  );
};

export default AccountList;
