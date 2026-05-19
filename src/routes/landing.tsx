import {
  Alert,
  Box,
  Button,
  Center,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import logo from "@/assets/smarted-logo.png";
import { InfoCircle } from "@solar-icons/react";

const SignInPage = () => {
  return (
    <Center h="100vh" bg="lightBackground">
      <Paper radius="lg" bg="whBg" p="xl" shadow="lg" maw={480}>
        <Flex direction="column" align="center">
          <Image src={logo} h={66} w={66} />
          <Text mt={4} size="xl" c="primary2" fw={600}>
            SMART Ed
          </Text>
        </Flex>

        <Box mt={10} mb={20}>
          <Text size="xl" c="mainText" fw={600}>
            Sign in
          </Text>
          <Text size="sm" c="longText">
            Please enter your details
          </Text>
        </Box>

        <Flex gap={16} direction="column">
          <TextInput
            labelProps={{ mb: 6, fw: 400 }}
            label="Username"
            placeholder="Enter your username"
            required
          />
          <PasswordInput
            labelProps={{ mb: 6, fw: 400 }}
            label="Password"
            placeholder="Enter your password"
            required
          />
          <Button mt={10} mb={26}>
            Sign in
          </Button>
        </Flex>

        <Alert
          variant="light"
          bd="1px solid #CFDDFF"
          color="lightBackground"
          title="Data Privacy Notice"
          c="primary2"
          icon={<InfoCircle weight="Linear" size={20} />}
        >
          <Text c="primary" size="sm">
            This system is protected under the Data Privacy Act of 2012. Only
            authorized personnel may access this platform. All activities are
            logged and monitored.
          </Text>
        </Alert>
      </Paper>

      <Text c="longText" size="xs" pos="absolute" bottom={10}>
        © 2025 Department of Education - Schools Division of Mabalacat City
      </Text>
    </Center>
  );
};

export default SignInPage;
