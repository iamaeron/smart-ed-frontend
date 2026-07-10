import { Container, Flex, Text, Title } from "@mantine/core";

const ExploreSchoolsContainer = () => {
  return (
    <Container size="1200px" mt={160}>
      <Flex direction="column" align="center">
        <Title>Explore Schools</Title>
        <Text>
          Access detailed school information and performance-related data.
        </Text>
      </Flex>
    </Container>
  );
};

export default ExploreSchoolsContainer;
