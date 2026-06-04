import { Card, Divider, Grid, Text } from "@mantine/core";
import SchoolLogoCard from "./school-logo-card";

const SchoolInfo = ({ school }: { school: { [k: string]: any } }) => {
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
          <Text fw={600} fz={18} mt={2} mb={10}>
            School Information
          </Text>
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
            <Info label="Name" value={school.school_head} />
            <Info label="Phone No." value={school.phone_number} />
            <Grid.Col span={6} />
            <Info label="Email" value={school.head_email} />
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
