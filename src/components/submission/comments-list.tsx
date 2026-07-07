import {
  ActionIcon,
  Box,
  Center,
  Collapse,
  Divider,
  Flex,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import AppTooltip from "../system-management/app-tooltip";
import { ChevronDown } from "lucide-react";
import dayjs from "dayjs";
import type { Submission } from "@/types/data/submission.type";
import { useDisclosure } from "@mantine/hooks";

const SubmissionCommentsList = ({
  submissionData,
}: {
  submissionData: Submission;
}) => {
  const [expanded, { toggle }] = useDisclosure(true);

  return (
    <Box mt="lg">
      <Flex justify="space-between" align="center">
        <Title order={5} mb="sm">
          Comments{" "}
          <span style={{ color: "#555555" }}>
            {submissionData.comments_count}
          </span>
        </Title>

        <Group gap={4}>
          <Divider w={50} />
          <AppTooltip
            label={`${expanded ? "Hide" : "Show"} comments`}
            position="bottom"
            withArrow
          >
            <ActionIcon onClick={toggle} variant="subtle" color="gray">
              <ChevronDown
                size={22}
                style={{
                  transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                  transition: "transform 200ms",
                }}
              />
            </ActionIcon>
          </AppTooltip>
        </Group>
      </Flex>
      <Collapse expanded={expanded}>
        <Stack gap="xs">
          {submissionData.comments.map((comment: any) => (
            <Paper shadow="sm" p="sm" radius="lg" key={comment.id}>
              <Group gap="sm">
                <Center
                  component={Paper}
                  bdrs={999}
                  bg="#DBEAFE"
                  c="#1447E6"
                  fw={600}
                  w={30}
                  h={30}
                >
                  {comment.user.name[0]}
                </Center>

                <Box>
                  <Text size="sm" fw={600}>
                    {comment.user.name}
                  </Text>
                  <Text mt={-4} c="longText" size="sm">
                    @{comment.user.username}
                  </Text>
                </Box>
              </Group>

              <Text my="xs" size="sm">
                {comment.comment}
              </Text>
              <Flex justify="flex-end">
                <Text size="xs" c="longText">
                  {dayjs(comment.created_at).format("MMM DD, YYYY")}
                </Text>
              </Flex>
            </Paper>
          ))}
        </Stack>
      </Collapse>
    </Box>
  );
};

export default SubmissionCommentsList;
