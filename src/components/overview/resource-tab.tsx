import { Grid } from "@mantine/core";
import OverviewCol from "./overview-col";
import {
  Buildings,
  Chair,
  NotebookBookmark,
  UserHandUp,
} from "@solar-icons/react";
import ResourceSummary from "../dashboard/resource-summary";
import { useFetchResources } from "@/lib/fetcher/resource.fetcher";

const ResourceTab = () => {
  const { data, isPending } = useFetchResources();

  console.log(data);

  const resourceData = data?.results?.data?.totals_by_resource || [];

  return (
    <Grid rowGap={40}>
      <Grid.Col span={3}>
        <OverviewCol
          label="Total Classrooms"
          value={resourceData[0]?.total_inventory}
          icon={Buildings}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Total Teachers"
          value={resourceData[1]?.total_inventory}
          icon={UserHandUp}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Functional Seats"
          value={resourceData[2]?.total_inventory}
          icon={Chair}
          loading={isPending}
        />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Learning Materials"
          value={resourceData[3]?.total_inventory}
          icon={NotebookBookmark}
          loading={isPending}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <ResourceSummary
          data={resourceData}
          summary={false}
          loading={isPending}
        />
      </Grid.Col>
    </Grid>
  );
};

export default ResourceTab;
