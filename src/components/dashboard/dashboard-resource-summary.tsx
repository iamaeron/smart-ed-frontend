import { useFetchResources } from "@/lib/fetcher/resource.fetcher";
import ResourceSummary from "./resource-summary";

const DashboardResourceSummary = () => {
  const { data, isPending } = useFetchResources();

  const resourceData = data?.results?.data?.totals_by_resource || [];

  return <ResourceSummary data={resourceData} loading={isPending} />;
};

export default DashboardResourceSummary;
