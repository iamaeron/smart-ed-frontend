import { BackgroundImage, Grid, Paper, Title } from "@mantine/core";
import img from "@/assets/landing/girl-focused-drawing.jpg";

const DescriptionSectionContainer = () => {
  return (
    <Grid
      gap={0}
      h={430}
      align="stretch"
      styles={{
        inner: { height: "100%", margin: 0 },
      }}
    >
      <Grid.Col span={6} style={{ display: "flex", flexDirection: "column" }}>
        <BackgroundImage src={img} w="100%" style={{ flex: 1 }} />
      </Grid.Col>

      <Grid.Col span={6} style={{ display: "flex", flexDirection: "column" }}>
        <Paper
          p={40}
          m={0}
          radius={0}
          style={{ flex: 1, display: "flex", alignItems: "center" }}
        >
          <Title style={{ maxWidth: "22ch" }}>
            A centralized platform for{" "}
            <span style={{ color: "#2c68ff" }}>education data, analytics,</span>{" "}
            and <span style={{ color: "#2c68ff" }}>insights.</span>
          </Title>
        </Paper>
      </Grid.Col>
    </Grid>
  );
};

export default DescriptionSectionContainer;
