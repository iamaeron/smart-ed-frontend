import { Card, Text } from "@mantine/core";
import { Link } from "react-router";

const ReturnedWarningCard = ({ subId }: { subId: string }) => {
  return (
    <Card bg="red.1" mb="lg">
      <Text size="sm" c="red.9">
        Your last data submission was returned. Please have it approved first
        before editing again.{" "}
        <Link
          to={`/school-account/submissions?sub=${subId}`}
          style={{ fontWeight: 600, color: "#c92a2a" }}
        >
          Review Submission {"->"}
        </Link>
      </Text>
    </Card>
  );
};

export default ReturnedWarningCard;
