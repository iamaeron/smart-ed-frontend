import { Box } from "@mantine/core";
import KPIManagement from "./kpi-management";
import KPITrend from "./kpi-trend";

const KPITab = () => {
  return (
    <Box>
      <KPITrend />
      <KPIManagement />
    </Box>
  );
};

export default KPITab;
