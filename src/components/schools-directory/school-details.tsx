import { Card, Divider, Grid, Text } from "@mantine/core";

const SchoolDetails = ({
  school,
  view = false,
}: {
  school: Record<any, any>;
  view?: boolean;
}) => {
  return (
    <>
      <Grid rowGap={20}>
        <Info view={view} label="School Name" value={school.school_name} />
        <Info view={view} label="School ID" value={school.school_code} />
        <Info
          view={view}
          label="Year Established"
          value={school.year_established}
        />
        <Info
          view={view}
          label="Type"
          value={view ? school.school_type : school.school_type.name}
        />
      </Grid>

      <Text fw={600} fz={view ? 16 : 18} mt={40} mb={10}>
        Address
      </Text>
      <Divider mb={20} />
      <Grid rowGap={20}>
        <Info view={view} capt label="Street" value={school.address.street} />
        <Info view={view} capt label="City" value={school.address.city} />
        <Info
          view={view}
          capt
          label="Barangay"
          value={school.address.barangay}
        />
        <Info
          view={view}
          capt
          label="Province"
          value={school.address.province}
        />
        <Info view={view} capt label="District" value={school.district} />
        <Info view={view} capt label="Region" value={school.region} />
      </Grid>

      <Text fw={600} fz={view ? 16 : 18} mt={40} mb={10}>
        School Head
      </Text>
      <Divider mb={20} />
      <Grid rowGap={20}>
        <Info
          view={view}
          label="Name"
          value={view ? school.school_head : school.school_head.name}
        />
        <Info
          view={view}
          label="Phone No."
          value={view ? school.phone_number : school.school_head.phone_number}
        />
        <Grid.Col span={6} />
        <Info
          view={view}
          label="Email"
          value={view ? school.email : school.school_head.head_email}
        />
      </Grid>
    </>
  );
};

export default SchoolDetails;

export const Info = ({
  label,
  value,
  capt,
  view,
}: {
  label: string;
  value: string;
  capt?: boolean;
  view: boolean;
}) => {
  return (
    <Grid.Col span={6}>
      <Card p="0" shadow="none" radius="md">
        <Text fz={14} c="longText">
          {label}
        </Text>
        <Text
          size={view ? "sm" : "md"}
          tt={capt ? "capitalize" : undefined}
          fw={500}
        >
          {value}
        </Text>
      </Card>
    </Grid.Col>
  );
};
