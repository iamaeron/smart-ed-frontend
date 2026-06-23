import type { Submission } from "@/types/data/submission.type";
import { Grid, Box, Card, Flex, Group, Text, Paper } from "@mantine/core";
import { Back2Line, Comment2Line, TimeLine, CheckFill } from "@mingcute/react";
import { User } from "@solar-icons/react";
import dayjs from "dayjs";
import ViewSubmissionModal from "./view-submission-modal";

const SubmissionListItem = ({ submission }: { submission: Submission }) => {
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

  return (
    <Card shadow="lg" p="lg" radius="lg">
      <Flex justify="space-between">
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

        <div>
          <ViewSubmissionModal submission={submission} />
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
