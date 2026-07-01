import { Card, Center, Flex, Image, Paper, Text } from "@mantine/core";
import logo from "@/assets/smarted-logo.png";

const NotFound = () => {
  return (
    <Paper h="100vh" w="100vw" bg="lightBackground">
      <Card bg="white">
        <Flex align="center" gap={10} style={{ whiteSpace: "nowrap" }}>
          <Image src={logo} w={30} h={30} />
          {/* {desktopOpened ? (
                        <Text size="lg" c="primary2" fw={600}>
                        SMART Ed
                        </Text>
                        ) : null} */}
          <Text size="lg" c="primary2" fw={600}>
            SMART Ed
          </Text>
        </Flex>
      </Card>
      <Center>
        <h1>404 - Page Not Found</h1>
      </Center>
    </Paper>
  );
};

export default NotFound;
