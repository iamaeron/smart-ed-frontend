import { Box, Card, Image, Text } from "@mantine/core";

const SchoolCard = ({ school }: { school: Record<any, any> }) => {
  return (
    <Box
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src={school.image}
        h={150}
        w={150}
        radius="md"
        mb={-50}
        style={{ zIndex: 2 }}
      />
      <Card
        style={{
          flex: 1,
          borderRadius: "0 2rem 0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 50,
          paddingRight: 20,
          paddingLeft: 20,
        }}
        shadow="lg"
      >
        <Text ta="center" fw={600}>
          {school.school_name}
        </Text>
      </Card>
    </Box>
  );
};

export default SchoolCard;
