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
import ReturnedWarningCard from "./returned-warning-card";
import ApprovedInfoCard from "./approved-info-card";
import RequestEditDataConfirmModal from "./request-edit-data-confirm-modal";
import { findUserSubmission } from "@/lib/find-user-submission";

const EditSchoolEnrollmentDataModal = ({
  data,
  loading,
  review,
  submissionId,
}: {
  data: any;
  loading: boolean;
  review?: boolean;
  submissionId?: string;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const onSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    if (review) formData.append("_method", "PUT");
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
      const reqFunc = review
        ? api.post(`/api/submissions/${submissionId}`, formData)
        : api.post(`/api/submissions`, formData);

      const res = await reqFunc;

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        if (review) {
          queryClient.invalidateQueries({
            queryKey: ["submission", submissionId, {}],
          });
        }
        close();
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const rows = data.map(
    (
      element: EnrollmentByGradeData & {
        male_count: string;
        female_count: string;
      },
    ) => (
      <Table.Tr
        data-grade-level={element.grade_level}
        key={element.grade_level}
      >
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
            defaultValue={element.total_male ?? element.male_count}
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
            defaultValue={element.total_female ?? element.female_count}
            className="w-full"
          />
        </Table.Td>
      </Table.Tr>
    ),
  );

  const TYPE = "enrollment";

  const { hasData: hasEditRequestEnrollmentData } = findUserSubmission(
    TYPE,
    "edit-request",
  );

  const { hasData: hasPendingEnrollmentData } = findUserSubmission(
    TYPE,
    "pending",
  );

  const {
    foundData: approvedEnrollmentData,
    hasData: hasApprovedEnrollmentData,
  } = findUserSubmission(TYPE, "approved");

  const {
    foundData: returnedEnrollmentData,
    hasData: hasReturnedEnrollmentData,
  } = findUserSubmission(TYPE, "returned");

  const isReturned = hasReturnedEnrollmentData && !review;
  const isApproved = hasApprovedEnrollmentData && !review;

  const isTableDisabled = isReturned || isApproved;

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
            {isReturned ? (
              <ReturnedWarningCard subId={returnedEnrollmentData?.id} />
            ) : null}

            {isApproved ? <ApprovedInfoCard /> : null}

            <Paper
              h={isTableDisabled ? 200 : "max-content"}
              style={
                isTableDisabled
                  ? { overflow: "hidden", position: "relative" }
                  : {}
              }
            >
              <Paper
                withBorder
                radius="md"
                style={
                  isTableDisabled
                    ? {
                        opacity: 0.8,
                        cursor: "not-allowed",
                      }
                    : { overflow: "hidden" }
                }
              >
                <Table
                  style={{
                    pointerEvents: isTableDisabled ? "none" : "all",
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

              {isTableDisabled ? (
                <div
                  style={{
                    position: "absolute",
                    height: 100,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    cursor: "not-allowed",
                    // background: "linear-gradient(to top, white, transparent)",
                    backgroundImage:
                      "linear-gradient(to top, white, transparent)",
                  }}
                ></div>
              ) : null}
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
              {isApproved ? (
                <RequestEditDataConfirmModal
                  subId={approvedEnrollmentData?.id}
                />
              ) : (
                <EditSchoolDataConfirmModal disabled={isReturned} />
              )}
            </Flex>
          </Paper>
        </form>
      </Modal>

      {loading ? (
        <Skeleton w={60} h={26} />
      ) : hasPendingEnrollmentData || hasEditRequestEnrollmentData ? (
        <Button
          size="compact-sm"
          radius="sm"
          px="md"
          variant="outline"
          color="yellow"
        >
          {hasPendingEnrollmentData ? "Submission Pending" : "Edit Requested"}
        </Button>
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
