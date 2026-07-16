import { Box, Flex, Image, Text } from "@mantine/core";
import logo from "@/assets/smarted-logo.png";

const Logo = ({
  withDiv,
  imgSize = 30,
  white,
}: {
  withDiv?: boolean;
  imgSize?: number;
  white?: boolean;
}) => {
  return (
    <Flex align="center" gap={10} style={{ whiteSpace: "nowrap" }}>
      <Image src={logo} w={imgSize} h={imgSize} />
      <Box>
        <Text size="lg" c={white ? "white" : "primary2"} fw={600}>
          SMART Ed
        </Text>

        {withDiv && (
          <Text
            size="sm"
            c={white ? "rgba(255,255,255,0.7)" : "primary2"}
            mt={-6}
          >
            Schools Division of Mabalacat City
          </Text>
        )}
      </Box>
    </Flex>
  );
};

export default Logo;
