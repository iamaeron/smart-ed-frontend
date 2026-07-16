import Logo from "@/components/logo";
import {
  BackgroundImage,
  Container,
  Flex,
  Paper,
  Text,
  Title,
} from "@mantine/core";
import bg from "@/assets/landing/school.png";
import QuickLinksContainer from "@/components/landing/quick-links-container";
import AdvisoriesContainer from "@/components/landing/advisories-container";
import DescriptionSectionContainer from "@/components/landing/description-section-container";
import ExploreSchoolsContainer from "@/components/landing/explore-schools-container";
import Footer from "@/components/landing/footer";

const LandingPage = () => {
  return (
    <div
      style={{
        // paddingBottom: "80px",
        backgroundColor: "#f3f5ff",
        minHeight: "100vh",
      }}
    >
      <Paper py="md">
        <Container size="1200px">
          <Logo withDiv imgSize={40} />
        </Container>
      </Paper>
      <Paper bg="#0d4fe2">
        <BackgroundImage src={bg} c="white" h="75vh">
          <Paper
            radius="none"
            style={{
              backgroundColor: "transparent",
              backgroundImage:
                "linear-gradient(360deg, rgba(25, 45, 124, 0.9) 22.6%, rgba(44, 104, 255, 0.6) 73.08%)",
              height: "100%",
            }}
          >
            <Container h="100%" size="1200px">
              <Flex h="100%" justify="end" direction="column" pb={150}>
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

      <QuickLinksContainer />
      <AdvisoriesContainer />
      <DescriptionSectionContainer />
      <ExploreSchoolsContainer />
      <Footer />

      {/* <iframe
        src="https://www.google.com/maps/d/u/0/embed?mid=1sb-hHj0QgFzt3SJ0rOBSHOJoKRnWJ6Q&ehbc=2E312F&noprof=1"
        width="640"
        height="480"
      ></iframe> */}
    </div>
  );
};

export default LandingPage;
