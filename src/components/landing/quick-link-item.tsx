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
    <Box style={{ aspectRatio: "1 / 1" }}>
      <BackgroundImage src={img} h="100%" w="100%">
        <Paper
          radius="none"
          style={{
            backgroundColor: "transparent",
            backgroundImage:
              "linear-gradient(180deg, rgba(25, 45, 124, 0.14) 0%, rgba(44, 104, 255, 0.7) 100%)",
            height: "100%",
          }}
          p="md"
        >
          <Text fz="lg" fw={600} c="white">
            {title}
          </Text>

          <Text c="white">{desc}</Text>
        </Paper>
      </BackgroundImage>
    </Box>
  );
};

export default QuickLinkItem;
