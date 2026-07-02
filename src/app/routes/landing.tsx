import Logo from "@/components/logo";
import {
  BackgroundImage,
  Container,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import bg from "@/assets/school.png";

const LandingPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
      }}
    >
      <Paper py="md">
        <Container size="1200px">
          <Logo />
        </Container>
      </Paper>
      <Paper bg="#0d4fe2">
        <BackgroundImage src={bg} c="white" h="75vh">
          <Paper
            // bg="transparent"
            radius="none"
            style={{
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(360deg, rgba(25, 45, 124, 0.9) 22.6%, rgba(44, 104, 255, 0.6) 73.08%)",
              height: "100%",
            }}
          >
            <Container h="100%" size="1200px">
              <Flex h="100%" justify="end" direction="column" pb={100}>
                <Title fz={48} mb="sm" style={{ maxWidth: "16ch" }}>
                  Smarter Insights for Better Education.
                </Title>
                <Text opacity={0.8} style={{ maxWidth: "60ch" }}>
                  Empowering the Division of Mabalacat City with data-driven
                  insights to transform education. Monitor enrollment, track
                  performance metrics, and manage resources efficiently.
                </Text>
              </Flex>
            </Container>
          </Paper>
        </BackgroundImage>
      </Paper>
    </div>
  );
};

export default LandingPage;
