import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Skeleton,
  Table,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { X } from "lucide-react";
import type { EnrollmentByGradeData } from "../overview/enrollment-grade-level";
import EditSchoolDataConfirmModal from "./edit-school-data-confirm-modal";

const EditSchoolEnrollmentDataModal = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const rows = data.map((element: EnrollmentByGradeData) => (
    <Table.Tr key={element.grade_level}>
      <Table.Td fw={600} ta="left">
        {element.grade_level}
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          classNames={{
            input: "custom-data-input",
          }}
          defaultValue={element.total_male}
          className="w-full"
        />
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          classNames={{
            input: "custom-data-input",
          }}
          defaultValue={element.total_female}
          className="w-full"
        />
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        padding={0}
      >
        <Card
          pos={"sticky"}
          top={0}
          py="md"
          style={{ zIndex: 20, borderBottom: "1px solid #EAEAFF" }}
          px="lg"
        >
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Edit Enrollment Data
            </Text>

            <ActionIcon
              onClick={close}
              variant="subtle"
              color="gray"
              type="button"
            >
              <X size={18} />
            </ActionIcon>
          </Group>
        </Card>

        <form
          id="edit-school-data-form"
          // onSubmit={handleSubmit(onSubmit)}
        >
          <Paper p="lg">
            <Paper withBorder radius="md" style={{ overflow: "hidden" }}>
              <Table highlightOnHover layout="fixed" horizontalSpacing="md">
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th w="60%" fw="400" fz={14} c="longText">
                      Grade Level
                    </Table.Th>
                    <Table.Th
                      w="20%"
                      fw="400"
                      fz={14}
                      c="longText"
                      pr={10}
                      pl={10}
                    >
                      Male
                    </Table.Th>
                    <Table.Th
                      w="20%"
                      fw="400"
                      fz={14}
                      c="longText"
                      pr={10}
                      pl={10}
                    >
                      Female
                    </Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
              </Table>
            </Paper>

            <Flex justify="flex-end" mt={20} gap={8}>
              <Button
                onClick={close}
                tt="uppercase"
                variant="outline"
                color="primary"
                c="primary"
                type="button"
              >
                Cancel
              </Button>
              <EditSchoolDataConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>

      {loading ? (
        <Skeleton w={60} h={26} />
      ) : (
        <Button
          onClick={open}
          size="compact-sm"
          radius="sm"
          px="md"
          variant="outline"
          color="blue"
        >
          Edit
        </Button>
      )}
    </>
  );
};

export default EditSchoolEnrollmentDataModal;
