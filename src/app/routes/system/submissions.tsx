import OverviewCol from "@/components/overview/overview-col";
import AppLayout from "@/layouts/app.layout";
import { Box, Grid, Text, Title } from "@mantine/core";
import {
  Alarm,
  CheckCircle,
  ListCheck,
  PenNewRound,
  Upload,
  UploadSquare,
} from "@solar-icons/react";

const SystemAdminSubmissions = () => {
  return (
    <AppLayout>
      <Box mb={30}>
        <Text c="primary2">SUBMISSIONS</Text>
        <Title order={1} my={6}>
          Submissions
        </Title>
        <Text c="grey">Schools Division of Mabalacat City</Text>
      </Box>

      <Grid rowGap={40}>
        <Grid.Col span={3}>
          <OverviewCol
            highlighted
            label="Total Submissions"
            value="12"
            icon={Upload}
          />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol label="Approved" value="8" icon={CheckCircle} />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol label="Pending Reviews" value="3" icon={Alarm} />
        </Grid.Col>
        <Grid.Col span={3}>
          <OverviewCol label="Returned" value="1" icon={PenNewRound} />
        </Grid.Col>
      </Grid>
    </AppLayout>
  );
};

export default SystemAdminSubmissions;
