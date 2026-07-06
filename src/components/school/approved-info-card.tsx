import { Card, Text } from "@mantine/core";

const ApprovedInfoCard = () => {
  return (
    <Card bg="blue.0" mb="lg">
      <Text size="sm" c="blue.9">
        This data submission has already been approved. To make changes, please
        request edit permission from your division administrator.{" "}
      </Text>
    </Card>
  );
};

export default ApprovedInfoCard;
