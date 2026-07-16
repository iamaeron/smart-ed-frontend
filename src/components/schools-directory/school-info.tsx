import { Card, Divider, Flex, Grid, Text } from "@mantine/core";
import SchoolLogoCard from "./school-logo-card";
import { useAuth } from "@/contexts/auth.context";
import EditSchoolInfoModal from "../school/edit-school-info-modal";
import SchoolDetails from "./school-details";

const SchoolInfo = ({ school }: { school: { [k: string]: any } }) => {
  const { user } = useAuth();

  return (
    <Grid>
      <Grid.Col span={8}>
        <Card
          w="100%"
          bg="white"
          h="100%"
          // withBorder
          p="lg"
          c="mainText"
          radius="lg"
          // bd="1px solid rgba(0,0,0,0.1)"
          shadow="xl"
          pb={40}
        >
          <Flex mt={2} mb={10} align="center" justify="space-between">
            <Text fw={600} fz={18}>
              School Information
            </Text>

            {user?.role === "School Account" && (
              <EditSchoolInfoModal school={school} />
            )}
          </Flex>
          <Divider mb={20} />
          <SchoolDetails school={school} />
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <SchoolLogoCard school={school} />
      </Grid.Col>
    </Grid>
  );
};

export default SchoolInfo;
