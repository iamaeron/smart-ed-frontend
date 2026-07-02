import { Flex, Image, Text } from "@mantine/core";
import logo from "@/assets/smarted-logo.png";

const Logo = () => {
  return (
    <Flex align="center" gap={10} style={{ whiteSpace: "nowrap" }}>
      <Image src={logo} w={30} h={30} />
      <Text size="lg" c="primary2" fw={600}>
        SMART Ed
      </Text>
    </Flex>
  );
};

export default Logo;
