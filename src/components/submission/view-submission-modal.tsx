import { useAuth } from "@/contexts/auth.context";
import { useFetchSubmission } from "@/lib/fetcher/submission.fetcher";
import type { Submission } from "@/types/data/submission.type";
import {
  ActionIcon,
  Box,
  Button,
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
import { useDisclosure } from "@mantine/hooks";
import {
  Back2Line,
  CheckFill,
  Comment2Line,
  Eye2Line,
  TimeLine,
} from "@mingcute/react";
import dayjs from "dayjs";
import { User, X } from "lucide-react";
import ReturnSubmissionModal from "./return-submission-modal";
import ApproveSubmissionConfirmModal from "./approve-submission-confirm-modal";

const ViewSubmissionModal = ({ submission }: { submission: Submission }) => {
  const { user } = useAuth();
  const { data, isPending } = useFetchSubmission(String(submission.id));
  const [opened, { open, close }] = useDisclosure(false);

  const submissionData = data?.results?.data;

  const statusColors = {
    pending: {
      bg: "subYellow",
      icon: <TimeLine size={16} />,
    },
    approved: {
      bg: "subGreen",
      icon: <CheckFill size={16} />,
    },
    returned: {
      bg: "subRed",
      icon: <Back2Line size={16} />,
    },
  };

  const rows = submissionData?.details?.items.map((element: any) => (
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
          {element.female_count}
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
              {submission.submission_number}
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
          <Paper bg="lightBackground" p="lg">
            <Box>
              <Box>
                <Group>
                  <Text fw={600}>{submission.school.school_name}</Text>
                  <Paper
                    c="white"
                    bg={statusColors[submission.status].bg}
                    radius={999}
                    px={10}
                    py={3}
                    tt="uppercase"
                  >
                    <Group gap={4}>
                      {statusColors[submission.status].icon}
                      <Text fz={12} fw={500}>
                        {submission.status}
                      </Text>
                    </Group>
                  </Paper>
                  <Group gap={4}>
                    <Comment2Line size={14} />
                    <Text size="xs">{submission.comments_count} comments</Text>
                  </Group>
                </Group>
                <Text c="longText" fz={14}>
                  School ID: {submission.school.school_code}
                </Text>
              </Box>

              <Grid mt="sm">
                <Grid.Col span={6}>
                  <Text c="longText" fz={14}>
                    Submission ID
                  </Text>
                  <Text fw={600} fz={14}>
                    {submission.submission_number}
                  </Text>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text c="longText" fz={14}>
                    Type
                  </Text>
                  <Text fw={600} fz={14} tt="capitalize">
                    {submission.type} data
                  </Text>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text c="longText" fz={14}>
                    Submitted By
                  </Text>
                  <Group gap={4}>
                    <User size={16} />
                    <Text fw={600} fz={14}>
                      {submission.submitted_by}
                    </Text>
                  </Group>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text c="longText" fz={14}>
                    Date Submitted
                  </Text>
                  <Text fw={600} fz={14}>
                    {dayjs(submission.date_submitted).format("MM/DD/YYYY")}
                  </Text>
                </Grid.Col>
              </Grid>

              <Divider my="md" />

              <Box>
                <Title order={5} mb="sm">
                  Submission Data
                </Title>
                {isPending ? (
                  <Skeleton h={300} w="100%" />
                ) : (
                  <Paper radius="sm" bg="white" p="lg">
                    <Title order={6} mb="xs" tt="capitalize">
                      {submissionData.type} Data
                    </Title>

                    <Table layout="fixed" horizontalSpacing={0}>
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
                )}
              </Box>
            </Box>

            {user?.role !== "School Account" &&
              submission.status === "pending" && (
                <Flex justify="flex-end" mt={20} gap={8}>
                  <ReturnSubmissionModal submission={submission} />
                  <ApproveSubmissionConfirmModal submission={submission} />
                  {/* <Button
                  onClick={close}
                  tt="uppercase"
                  variant="outline"
                  color="primary"
                  c="primary"
                  type="button"
                >
                  Cancel
                </Button> */}
                  {/* <EditSchoolDataConfirmModal /> */}
                </Flex>
              )}
          </Paper>
        </form>
      </Modal>

      <Button
        onClick={open}
        size="compact-sm"
        variant="outline"
        radius="sm"
        px="sm"
        leftSection={<Eye2Line size={18} />}
      >
        Review
      </Button>
    </>
  );
};

export default ViewSubmissionModal;
