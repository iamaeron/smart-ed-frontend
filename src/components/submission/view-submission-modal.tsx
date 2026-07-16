import { useAuth } from "@/contexts/auth.context";
import { useFetchSubmission } from "@/lib/fetcher/submission.fetcher";
import type { Submission } from "@/types/data/submission.type";
import {
  ActionIcon,
  Box,
  Card,
  Divider,
  Flex,
  Grid,
  Group,
  Modal,
  Paper,
  Skeleton,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { Comment2Line } from "@mingcute/react";
import dayjs from "dayjs";
import { User, X } from "lucide-react";
import ReturnSubmissionModal from "./return-submission-modal";
import ApproveSubmissionConfirmModal from "./approve-submission-confirm-modal";
import EditSchoolEnrollmentDataModal from "../school/edit-school-enrollment-data-modal";
import EditSchoolResourcesDataModal from "../school/edit-school-resources-data-modal";
import SubmissionCommentsList from "./comments-list";
import StatusChip from "./status-chip";
import SchoolDetails from "../schools-directory/school-details";

type ViewSubModalProps = {
  submissionId: number | string | null;
  opened: boolean;
  onClose: () => void;
};

const ViewSubmissionModal = ({
  submissionId,
  onClose,
  opened,
}: ViewSubModalProps) => {
  const { user } = useAuth();

  const { data, isPending, isFetching } = useFetchSubmission(
    submissionId !== null ? String(submissionId) : "",
    {},
    { enabled: opened },
  );

  const submissionData: Submission | undefined = data?.results?.data;
  const loading = isPending || isFetching || !submissionId || !submissionData;

  return (
    <Modal
      withCloseButton={false}
      opened={opened}
      onClose={onClose}
      size="lg"
      centered
      padding={0}
    >
      <Card
        pos="sticky"
        top={0}
        py="md"
        bg="lightBackground"
        style={{
          zIndex: 20,
          borderBottom: "1px solid #EAEAFF",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        px="lg"
      >
        <Group justify="space-between">
          <Text size="lg" fw={600}>
            {loading ? (
              <Skeleton h={20} w={120} />
            ) : (
              submissionData!.submission_number
            )}
          </Text>

          <ActionIcon
            onClick={onClose}
            variant="subtle"
            color="gray"
            type="button"
          >
            <X size={18} />
          </ActionIcon>
        </Group>
      </Card>

      <div>
        <Paper bg="lightBackground" p="lg">
          {loading ? (
            <Box>
              <Skeleton h={24} w="60%" mb="sm" />
              <Skeleton h={16} w="30%" mb="md" />
              <Skeleton h={300} w="100%" />
            </Box>
          ) : (
            <Box>
              <Box>
                <Box>
                  <Group>
                    <Text fw={600}>{submissionData.school.school_name}</Text>
                    <StatusChip status={submissionData.status} />
                    <Group gap={4}>
                      <Comment2Line size={14} />
                      <Text size="xs">
                        {submissionData.comments_count} comments
                      </Text>
                    </Group>
                  </Group>
                  <Text c="longText" fz={14}>
                    School ID: {submissionData.school.school_code}
                  </Text>
                </Box>

                <Grid mt="sm">
                  <Grid.Col span={6}>
                    <Text c="longText" fz={14}>
                      Submission ID
                    </Text>
                    <Text fw={600} fz={14}>
                      {submissionData.submission_number}
                    </Text>
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Text c="longText" fz={14}>
                      Type
                    </Text>
                    <Text fw={600} fz={14} tt="capitalize">
                      {submissionData.type} data
                    </Text>
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Text c="longText" fz={14}>
                      Submitted By
                    </Text>
                    <Group gap={4}>
                      <User size={16} />
                      <Text fw={600} fz={14}>
                        {submissionData.submitted_by}
                      </Text>
                    </Group>
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Text c="longText" fz={14}>
                      Date Submitted
                    </Text>
                    <Text fw={600} fz={14}>
                      {dayjs(submissionData.date_submitted).format(
                        "MM/DD/YYYY",
                      )}
                    </Text>
                  </Grid.Col>
                </Grid>

                <Divider my="md" />

                {submissionData.type.includes("Edit Request") ? (
                  <Paper shadow="sm" radius="lg" bg="white" p="lg">
                    <Title order={6} mb="md" tt="capitalize">
                      {submissionData.type} Data
                    </Title>

                    <Card
                      bg="blue.0"
                      shadow="none"
                      style={{
                        border: "1px solid var(--mantine-color-blue-2)",
                      }}
                    >
                      <Text size="sm" c="blue.9">
                        This school has requested an edit permission for their
                        enrollment data.
                      </Text>
                    </Card>
                  </Paper>
                ) : (
                  <Box>
                    <Title order={5} mb="sm">
                      Submission Data
                    </Title>
                    <Paper shadow="sm" radius="lg" bg="white" p="lg">
                      <Flex mb="xs" justify="space-between" align="flex-end">
                        <Title order={6} tt="capitalize">
                          {submissionData.type} Data
                        </Title>

                        {submissionData.type === "enrollment" &&
                        submissionData.status === "returned" ? (
                          <EditSchoolEnrollmentDataModal
                            data={submissionData?.details?.items}
                            loading={isPending}
                            submissionId={String(submissionData?.id)}
                            review
                          />
                        ) : null}

                        {submissionData.type === "resource" &&
                        submissionData.status === "returned" ? (
                          <EditSchoolResourcesDataModal
                            data={submissionData?.details}
                            loading={isPending}
                            review
                            submissionId={String(submissionData?.id)}
                          />
                        ) : null}
                      </Flex>

                      {submissionData.type === "enrollment" && (
                        <EnrollmentDataTable
                          data={submissionData?.details?.items}
                        />
                      )}

                      {submissionData.type === "resource" && (
                        <ResourceDataTable data={submissionData?.details} />
                      )}

                      {submissionData.type === "information" && (
                        <SchoolDetails school={submissionData?.details} view />
                      )}
                    </Paper>
                  </Box>
                )}

                {submissionData.comments_count > 0 && (
                  <SubmissionCommentsList submissionData={submissionData} />
                )}
              </Box>

              {user?.role !== "School Account" &&
                submissionData.status === "pending" && (
                  <Flex justify="flex-end" mt={20} gap={8}>
                    <ReturnSubmissionModal
                      requestEdit={submissionData.type.includes("Edit Request")}
                      submission={submissionData}
                    />
                    <ApproveSubmissionConfirmModal
                      requestEdit={submissionData.type.includes("Edit Request")}
                      submission={submissionData}
                    />
                  </Flex>
                )}
            </Box>
          )}
        </Paper>
      </div>
    </Modal>
  );
};

export default ViewSubmissionModal;

const EnrollmentDataTable = ({ data }: { data: any }) => {
  const rows = data.map((element: any) => (
    <Table.Tr key={element.grade_level}>
      <Table.Td fw={600} ta="left">
        {element.grade_level}
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <Paper
          withBorder
          px="xs"
          py={2}
          style={{ borderColor: "#d5d5d5" }}
          fw={600}
          radius="sm"
        >
          {element.male_count}
        </Paper>
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <Paper
          withBorder
          px="xs"
          py={2}
          style={{ borderColor: "#d5d5d5" }}
          fw={600}
          radius="sm"
        >
          {element.female_count}
        </Paper>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table layout="fixed" horizontalSpacing={0}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="60%" fw="400" fz={14} c="longText">
            Grade Level
          </Table.Th>
          <Table.Th w="20%" fw="400" fz={14} c="longText" pr={10} pl={10}>
            Male
          </Table.Th>
          <Table.Th w="20%" fw="400" fz={14} c="longText" pr={10} pl={10}>
            Female
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

const ResourceDataTable = ({ data }: { data: any }) => {
  const rows = data.map((element: any) => (
    <Table.Tr key={element.resource_name}>
      <Table.Td fw={600} ta="left">
        {element.resource_name}
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <Paper
          withBorder
          px="xs"
          py={2}
          style={{ borderColor: "#d5d5d5" }}
          fw={600}
          radius="sm"
        >
          {element.inventory}
        </Paper>
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <Paper
          withBorder
          px="xs"
          py={2}
          style={{ borderColor: "#d5d5d5" }}
          fw={600}
          radius="sm"
        >
          {element.requirement}
        </Paper>
      </Table.Td>
      <Table.Td pl={10} ta="left">
        <Paper
          withBorder
          px="xs"
          py={2}
          style={{ borderColor: "#d5d5d5" }}
          fw={600}
          radius="sm"
        >
          {element.need}
        </Paper>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table layout="fixed" horizontalSpacing={0}>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="40%" fw="400" fz={14} c="longText">
            Resource
          </Table.Th>
          <Table.Th w="20%" fw="400" fz={14} c="longText" pr={10} pl={10}>
            Inventory
          </Table.Th>
          <Table.Th w="20%" fw="400" fz={14} c="longText" pr={10} pl={10}>
            Requirement
          </Table.Th>

          <Table.Th w="20%" fw="400" fz={14} c="longText" pr={10} pl={10}>
            Need
          </Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};
