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
import type { SubmitEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";

const EditSchoolEnrollmentDataModal = ({
  data,
  loading,
}: {
  data: any;
  loading: boolean;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useAuth();

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("type", "enrollment");

    const gradeLevelNodes = document.querySelectorAll("[data-grade-level]");
    gradeLevelNodes.forEach((gradeLevelNode, index) => {
      const maleCount = (
        gradeLevelNode.querySelector("[data-male-count]") as HTMLInputElement
      ).value;
      const femaleCount = (
        gradeLevelNode.querySelector("[data-female-count]") as HTMLInputElement
      ).value;
      const gradeLevel = gradeLevelNode.getAttribute("data-grade-level") ?? "";

      formData.append(`details[${index}][grade_level]`, gradeLevel);
      formData.append(`details[${index}][female_count]`, femaleCount);
      formData.append(`details[${index}][male_count]`, maleCount);
    });

    try {
      const res = await api.post(`/api/submissions`, formData);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["academic_years", {}] });
        close();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const rows = data.map((element: EnrollmentByGradeData) => (
    <Table.Tr data-grade-level={element.grade_level} key={element.grade_level}>
      <Table.Td fw={600} ta="left">
        {element.grade_level}
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          data-male-count
          onFocus={(e) => e.target.select()}
          classNames={{
            input: "custom-data-input",
          }}
          defaultValue={element.total_male}
          className="w-full"
        />
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <TextInput
          data-female-count
          onFocus={(e) => e.target.select()}
          classNames={{
            input: "custom-data-input",
          }}
          defaultValue={element.total_female}
          className="w-full"
        />
      </Table.Td>
    </Table.Tr>
  ));

  const hasPendingEnrollmentData = user?.returned_submissions?.find(
    (f) => f.type === "enrollment",
  )
    ? true
    : false;

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

        <form id="edit-school-data-form" onSubmit={onSubmit}>
          <Paper p="lg">
            <Card bg="red.1" mb="lg">
              <Text size="sm" c="red.9">
                You still have a returned submission data. Please review it
                first before submitting another one.
              </Text>
            </Card>

            <Paper
              withBorder
              radius="md"
              style={
                hasPendingEnrollmentData
                  ? {
                      opacity: 0.7,
                      cursor: "not-allowed",
                    }
                  : { overflow: "hidden" }
              }
            >
              <Table
                style={{
                  pointerEvents: hasPendingEnrollmentData ? "none" : "all",
                }}
                highlightOnHover
                layout="fixed"
                horizontalSpacing="md"
              >
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
              <EditSchoolDataConfirmModal disabled={hasPendingEnrollmentData} />
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
