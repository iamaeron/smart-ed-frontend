import Loader from "@/components/loader";
import AppLayout from "@/layouts/app.layout";
import { useFetchSchool } from "@/lib/fetcher/school.fetcher";
import { Box, Flex, Text, Title } from "@mantine/core";
import { ChevronLeft } from "lucide-react";
import { Link, useParams } from "react-router";

const SystemAdminSchoolDirectory = () => {
  const { id } = useParams();

  if (!id) return <AppLayout>id not found</AppLayout>;

  const { data, isPending } = useFetchSchool(id);

  if (isPending) return <Loader />;
  console.log(data);

  return (
    <AppLayout>
      <Box>
        <Flex
          align="center"
          gap={4}
          component={Link}
          style={{ textDecoration: "none" }}
          to="/system-admin/schools-directory"
        >
          <ChevronLeft size={20} />
          <Text c="primary2">BACK TO SCHOOLS DIRECTORY</Text>
        </Flex>
        <Title order={1} my={6}>
          {data.results.school.school_name}
        </Title>
        <Text c="grey">ID: {data.results.school.school_code}</Text>
      </Box>
    </AppLayout>
  );
};

export default SystemAdminSchoolDirectory;
