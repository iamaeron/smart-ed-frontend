import Logo from "@/components/logo";
import { Card, Center, Paper } from "@mantine/core";

const NotFound = () => {
  return (
    <Paper h="100vh" w="100vw" bg="lightBackground">
      <Card bg="white">
        <Logo />
      </Card>
      <Center>
        <h1>404 - Page Not Found</h1>
      </Center>
    </Paper>
  );
};

export default NotFound;
