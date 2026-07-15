import { BackgroundImage, Box, Paper, Text } from "@mantine/core";

const QuickLinkItem = ({
  img,
  title,
  desc,
}: {
  img: string;
  title: string;
  desc: string;
}) => {
  return (
    <Box
      className="quick-link"
      style={{ aspectRatio: "1 / 1", overflow: "hidden" }}
    >
      <BackgroundImage src={img} h="100%" w="100%">
        <Paper
          radius="none"
          style={{
            display: "flex",
            alignItems: "flex-end",
            // flexDirection: "column",
            // justifyItems: "flex-end",
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(25, 45, 124, 0.14) 0%, rgba(44, 104, 255, 0.7) 100%)",
            height: "100%",
          }}
          p="sm"
        >
          <Box className="quick-link-desc">
            <Text
              fz="lg"
              fw={600}
              style={{ minWidth: "max-content" }}
              c="white"
            >
              {title}
            </Text>

            <Text c="white" size="sm" opacity={0.8}>
              {desc}
            </Text>
          </Box>
        </Paper>
      </BackgroundImage>
    </Box>
  );
};

export default QuickLinkItem;
