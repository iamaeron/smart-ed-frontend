import { Grid } from "@mantine/core";
import OverviewCol from "./overview-col";
import {
  Buildings,
  Chair,
  NotebookBookmark,
  UserHandUp,
} from "@solar-icons/react";
import ResourceSummary from "../dashboard/resource-summary";

const ResourceTab = () => {
  return (
    <Grid rowGap={40}>
      <Grid.Col span={3}>
        <OverviewCol label="Total Classrooms" value="960" icon={Buildings} />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol label="Total Teachers" value="1,215" icon={UserHandUp} />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol label="Functional Seats" value="27,000" icon={Chair} />
      </Grid.Col>
      <Grid.Col span={3}>
        <OverviewCol
          label="Learning Materials"
          value="31,000"
          icon={NotebookBookmark}
        />
      </Grid.Col>

      <Grid.Col span={12}>
        <ResourceSummary summary={false} />
      </Grid.Col>
    </Grid>
  );
};

export default ResourceTab;
