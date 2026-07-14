import type { SubmissionStatus } from "@/types/data/submission.type";
import { Group, Paper, Text } from "@mantine/core";
import { Back2Line, CheckFill, Edit4Line, TimeLine } from "@mingcute/react";

const statusColors = {
  pending: {
    bg: "yellow.1",
    c: "yellow.7",
    icon: <TimeLine size={16} />,
  },
  approved: {
    bg: "green.1",
    c: "green.7",
    icon: <CheckFill size={16} />,
  },
  returned: {
    bg: "red.1",
    c: "red.7",
    icon: <Back2Line size={16} />,
  },

  "edit-pending": {
    bg: "yellow.1",
    c: "yellow.7",
    icon: <TimeLine size={16} />,
  },
  "edit-request": {
    bg: "cyan.1",
    c: "cyan.7",
    icon: <Edit4Line size={16} />,
  },
  "edit-returned": {
    bg: "red.1",
    c: "red.7",
    icon: <Back2Line size={16} />,
  },
  "edit-granted": {
    bg: "green.1",
    c: "green.7",
    icon: <Back2Line size={16} />,
  },
};

const StatusChip = ({ status }: { status: SubmissionStatus }) => {
  return (
    <Paper
      c="white"
      bg={statusColors[status].bg}
      radius={999}
      px={10}
      py={3}
      tt="uppercase"
      shadow="none"
    >
      <Group gap={4} c={statusColors[status].c}>
        {statusColors[status].icon}
        <Text fz={12} fw={600} c={statusColors[status].c}>
          {status.replace("-", " ")}
        </Text>
      </Group>
    </Paper>
  );
};

export default StatusChip;
