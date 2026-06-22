import { Grid } from "@mantine/core";
import {
  Buildings,
  Chair,
  NotebookBookmark,
  UserHandUp,
} from "@solar-icons/react";
import ResourceSummary from "../dashboard/resource-summary";
import { useFetchResources } from "@/lib/fetcher/resource.fetcher";
import OverviewCol from "../overview/overview-col";

const SchoolResourceTab = ({ schoolName }: { schoolName: string }) => {
  const { data, isPending } = useFetchResources({ school_name: schoolName });

  const resourceData = data?.results?.data?.totals_by_resource || [];
  const resourceDataItems = data?.results?.data?.items || [];

  return (
    <Grid rowGap={40}>
      <Grid.Col span={3}>
        <OverviewCol
          label="Total Classrooms"
          value={resourceData[0]?.inventory}
          icon={Buildings}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Total Teachers"
          value={resourceData[1]?.inventory}
          icon={UserHandUp}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Functional Seats"
          value={resourceData[2]?.inventory}
          icon={Chair}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Learning Materials"
          value={resourceData[3]?.inventory}
          icon={NotebookBookmark}
          loading={isPending}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <ResourceSummary
          data={resourceDataItems}
          summary={false}
          loading={isPending}
        />
      </Grid.Col>
    </Grid>
  );
};

export default SchoolResourceTab;
