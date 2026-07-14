import type { Submission } from "@/types/data/submission.type";
import { Grid, Box, Card, Flex, Group, Text, Button } from "@mantine/core";
import { Comment2Line, Eye2Line } from "@mingcute/react";
import { User } from "@solar-icons/react";
import dayjs from "dayjs";
import StatusChip from "./status-chip";

const SubmissionListItem = ({
  submission,
  openSubmission,
}: {
  submission: Submission;
  openSubmission: () => void;
}) => {
  return (
    <Card shadow="lg" p="lg" radius="lg">
      <Flex justify="space-between">
        <Box>
          <Group>
            <Text fw={600}>{submission.school.school_name}</Text>
            <StatusChip status={submission.status} />
            <Group gap={4}>
              <Comment2Line size={14} />
              <Text size="xs">{submission.comments_count} comments</Text>
            </Group>
          </Group>
          <Text c="longText" fz={14}>
            School ID: {submission.school.school_code}
          </Text>
        </Box>

        <div>
          <Button
            onClick={openSubmission}
            size="compact-sm"
            variant="outline"
            radius="sm"
            px="sm"
            leftSection={<Eye2Line size={18} />}
          >
            Review
          </Button>
        </div>
      </Flex>

      <Grid mt="md">
        <Grid.Col span={3}>
          <Text c="longText" fz={14}>
            Submission ID
          </Text>
          <Text fw={600} fz={14}>
            {submission.submission_number}
          </Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text c="longText" fz={14}>
            Type
          </Text>
          <Text fw={600} fz={14} tt="capitalize">
            {submission.type} data
          </Text>
        </Grid.Col>

        <Grid.Col span={3}>
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

        <Grid.Col span={3}>
          <Text c="longText" fz={14}>
            Date Submitted
          </Text>
          <Text fw={600} fz={14}>
            {dayjs(submission.date_submitted).format("MM/DD/YYYY")}
          </Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
};

export default SubmissionListItem;
