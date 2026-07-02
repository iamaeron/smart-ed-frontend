import { Grid, Card, Container, Title, Flex } from "@mantine/core";
import latestUpdatesImg from "@/assets/landing/latest-updates.jpg";
import divisionOverviewImg from "@/assets/landing/division-overview.jpg";
import schoolDirectoryImg from "@/assets/landing/school-directory.jpg";
import QuickLinkItem from "./quick-link-item";

const QuickLinksContainer = () => {
  return (
    <Container size="1200px" mt={-40}>
      <Card shadow="md" p="lg" radius="none">
        <Grid>
          <Grid.Col span={6}>
            <Grid>
              <Grid.Col span={4}>
                <QuickLinkItem
                  img={latestUpdatesImg}
                  title="Latest Updates"
                  desc="Stay informed about the latest developments in our division."
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <QuickLinkItem
                  img={divisionOverviewImg}
                  title="Division Overview"
                  desc="Get a comprehensive view of our division's performance and initiatives."
                />
              </Grid.Col>
              <Grid.Col span={4}>
                <QuickLinkItem
                  img={schoolDirectoryImg}
                  title="School Directory"
                  desc="Find information about schools in our division."
                />
              </Grid.Col>
            </Grid>
          </Grid.Col>

          <Grid.Col span={6}>
            <Flex justify="end" h="100%" pr="md">
              <Title ta="right" style={{ maxWidth: "20ch" }}>
                <span style={{ color: "#2c68ff" }}>Quick links</span> to
                essential education insights.
              </Title>
            </Flex>
          </Grid.Col>
        </Grid>
      </Card>
    </Container>
  );
};

export default QuickLinksContainer;
