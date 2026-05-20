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
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type UserData, userSchema } from "@/types/form/user";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/auth.context";
import { Navigate, useNavigate } from "react-router";
import Loader from "@/components/loader";

const SignInPage = () => {
  const navigate = useNavigate();
  const { user, isLoading, setUser } = useAuth();
  const { control, handleSubmit, formState } = useForm<UserData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (isLoading) {
    return <Loader />;
  }

  if (user) {
    return <Navigate to="/system-admin/dashboard" />;
  }

  const onSubmit: SubmitHandler<UserData> = async (data) => {
    try {
      const csrf = await api.get("/sanctum/csrf-cookie");
      if (csrf.status === 204) {
        const res = await api.post("/api/login", data);
        if (res.data.results.User) {
          setUser(res.data.results.User);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Center mih="100vh" py={80} bg="lightBackground" pos="relative">
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

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex gap={12} direction="column">
            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextInput
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.username?.message ? "subRed" : "grey",
                    }}
                    error={formState.errors.username?.message ? true : false}
                    label="Username"
                    placeholder="Enter your username"
                    {...field}
                  />

                  <Flex justify="flex-end">
                    <Text mt={6} size="sm" c="subRed">
                      {formState.errors.username?.message}
                    </Text>
                  </Flex>
                </Box>
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Box>
                  <PasswordInput
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.password?.message ? "subRed" : "grey",
                    }}
                    error={formState.errors.password?.message ? true : false}
                    label="Password"
                    placeholder="Enter your password"
                    {...field}
                  />
                  <Flex justify="flex-end">
                    <Text mt={6} size="sm" c="subRed">
                      {formState.errors.password?.message}
                    </Text>
                  </Flex>
                </Box>
              )}
            />

            <Button
              loading={formState.isSubmitting}
              type="submit"
              mt={6}
              mb={26}
            >
              Sign in
            </Button>
          </Flex>
        </form>

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
