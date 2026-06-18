import { Button, Card, Divider, Flex, Grid, Text } from "@mantine/core";
import SchoolLogoCard from "./school-logo-card";
import { useAuth } from "@/contexts/auth.context";

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
              <Button
                size="compact-sm"
                radius="sm"
                px="md"
                variant="outline"
                color="blue"
              >
                Edit
              </Button>
            )}
          </Flex>
          <Divider mb={20} />
          <Grid rowGap={20}>
            <Info label="School Name" value={school.school_name} />
            <Info label="School ID" value={school.school_code} />
            <Info label="Year Established" value={school.year_established} />
            <Info label="Type" value={school.school_type.name} />
          </Grid>

          <Text fw={600} fz={18} mt={40} mb={10}>
            Address
          </Text>
          <Divider mb={20} />
          <Grid rowGap={20}>
            <Info label="Street" value={school.address.street} />
            <Info label="City" value={school.address.city} />
            <Info label="Barangay" value={school.address.barangay} />
            <Info label="Province" value={school.address.province} />
            <Info label="District" value={school.district} />
            <Info label="Region" value={school.region} />
          </Grid>

          <Text fw={600} fz={18} mt={40} mb={10}>
            School Head
          </Text>
          <Divider mb={20} />
          <Grid rowGap={20}>
            <Info label="Name" value={school.school_head.name} />
            <Info label="Phone No." value={school.school_head.phone_number} />
            <Grid.Col span={6} />
            <Info label="Email" value={school.school_head.head_email} />
          </Grid>
        </Card>
      </Grid.Col>
      <Grid.Col span={4}>
        <SchoolLogoCard school={school} />
      </Grid.Col>
    </Grid>
  );
};

export default SchoolInfo;

const Info = ({ label, value }: { label: string; value: string }) => {
  return (
    <Grid.Col span={6}>
      <Card p="0" shadow="none" radius="md">
        <Text fz={14} c="longText">
          {label}
        </Text>
        <Text fw={500}>{value}</Text>
      </Card>
    </Grid.Col>
  );
};
