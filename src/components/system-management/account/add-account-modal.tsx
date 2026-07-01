import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
  Select,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { ChevronDown, Plus, X } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { accountSchema, type AccountData } from "@/types/form/account.schema";
import { useFetchSchools } from "@/lib/fetcher/school.fetcher";
import AddAccountConfirmModal from "./add-account-confirm-modal";

const AddAccountModal = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { data } = useFetchSchools({ per_page: 50 });

  const schoolList =
    data?.results?.schools.map((school: any) => school.school_name) || [];

  const { control, handleSubmit, formState, setError, reset } =
    useForm<AccountData>({
      resolver: zodResolver(accountSchema),
      defaultValues: {
        name: "",
        username: "",
        email: "",
        password: "",
        role: "",
        password_confirmation: "",
        phone_number: "",
        school: "",
      },
    });

  const roleList = ["System Admin", "School Account", "Division Admin"];

  const onSubmit: SubmitHandler<AccountData> = async (data) => {
    const payload = data;

    try {
      const res = await api.post(`/api/users`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["user_accounts", {}],
        });
        reset();
        close();
      }
    } catch (err: any) {
      setError("form", { message: err.response.data.message });
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        padding={0}
      >
        <Card
          pos="sticky"
          top={0}
          py="md"
          bg="white"
          style={{ borderBottom: "1px solid #EAEAFF", zIndex: 50 }}
          px="lg"
        >
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Add Personnel
            </Text>

            <ActionIcon
              onClick={close}
              variant="subtle"
              color="gray"
              type="button"
            >
              <X size={18} />
            </ActionIcon>
          </Group>
        </Card>

        <form id="new-account-form" onSubmit={handleSubmit(onSubmit)}>
          <Paper p="lg">
            <Box>
              <Title order={5} mb={14}>
                School Head Information
              </Title>

              <Controller
                name="name"
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: fieldState.error?.message ? "subRed" : "dark",
                      }}
                      label="Name"
                      placeholder="Name"
                      radius="sm"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Group gap={16} my={14}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Box flex={1}>
                      <TextInput
                        {...field}
                        labelProps={{
                          mb: 6,
                          fw: 400,
                          c: formState.errors.email?.message
                            ? "subRed"
                            : "dark",
                        }}
                        label="Email"
                        placeholder="Email"
                        radius="sm"
                        error={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="phone_number"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Box flex={1}>
                      <TextInput
                        {...field}
                        labelProps={{
                          mb: 6,
                          fw: 400,
                          c: fieldState.error?.message ? "subRed" : "dark",
                        }}
                        label="Phone No."
                        placeholder="Phone No."
                        radius="sm"
                        error={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />
              </Group>
            </Box>

            <Box>
              <Title order={5} mt={20} mb={14}>
                Password & Security
              </Title>

              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Box>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: fieldState.error?.message ? "subRed" : "dark",
                      }}
                      label="Username"
                      placeholder="Username"
                      radius="sm"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1} my={14}>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: fieldState.error?.message ? "subRed" : "dark",
                      }}
                      label="Password"
                      placeholder="Password"
                      radius="sm"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="password_confirmation"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: fieldState.error?.message ? "subRed" : "dark",
                      }}
                      label="Confirm New Password"
                      placeholder="Password"
                      radius="sm"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />
            </Box>

            <Box>
              <Title order={5} mt={20} mb={14}>
                School Assignment
              </Title>

              <Group gap={16}>
                <Controller
                  name="school"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Box flex={1}>
                      <Select
                        {...field}
                        allowDeselect={false}
                        label="School"
                        placeholder="Search School ..."
                        rightSection={<ChevronDown size={16} />}
                        radius="sm"
                        searchable
                        comboboxProps={{
                          shadow: "xl",
                        }}
                        data={schoolList}
                        error={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="role"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Box flex={1}>
                      <Select
                        {...field}
                        allowDeselect={false}
                        label="Role"
                        placeholder="Search Role ..."
                        rightSection={<ChevronDown size={16} />}
                        radius="sm"
                        searchable
                        comboboxProps={{
                          shadow: "xl",
                        }}
                        data={roleList}
                        error={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />
              </Group>
            </Box>

            <Flex mt={30} gap={16}>
              <Button
                onClick={close}
                tt="uppercase"
                variant="outline"
                color="primary"
                c="primary"
                fullWidth
                type="button"
              >
                Cancel
              </Button>
              <AddAccountConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add Account
      </Button>
    </>
  );
};

export default AddAccountModal;
