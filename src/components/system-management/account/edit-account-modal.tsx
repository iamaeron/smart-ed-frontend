import ErrorMessage from "@/components/form/error-message";
import { api } from "@/lib/api";
import type { User } from "@/stores/auth.store";
import {
  editAccountSchema,
  type EditAccountData,
} from "@/types/form/account.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import EditAccountConfirmModal from "./edit-account-confirm-modal";

export type EditAccountModalProps = {
  account: User;
  opened: boolean;
  onClose: () => void;
};

const EditAccountModal = ({
  account,
  opened,
  onClose,
}: EditAccountModalProps) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState, setError, reset } =
    useForm<EditAccountData>({
      resolver: zodResolver(editAccountSchema),
      defaultValues: {
        name: account.name,
        username: account.username,
        email: account.email,
        phone_number: account.phone_number,
      },
    });

  const onSubmit: SubmitHandler<EditAccountData> = async (data) => {
    const payload = data;

    try {
      const res = await api.put(`/api/users/${account.user_id}`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["user_accounts", {}],
        });
        reset();
        onClose();
      }
    } catch (err: any) {
      setError("form", { message: err.response.data.message });
    }
  };

  return (
    <Modal
      withCloseButton={false}
      opened={opened}
      onClose={onClose}
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
            Edit Account Details
          </Text>

          <ActionIcon
            onClick={onClose}
            variant="subtle"
            color="gray"
            type="button"
          >
            <X size={18} />
          </ActionIcon>
        </Group>
      </Card>

      <form id="edit-account-form" onSubmit={handleSubmit(onSubmit)}>
        <Paper p="lg">
          <Box>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.name?.message ? "subRed" : "dark",
                    }}
                    label="Name"
                    placeholder="Name"
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.name?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <Box mt={14}>
                  <TextInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.username?.message ? "subRed" : "dark",
                    }}
                    label="Username"
                    placeholder="Username"
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.username?.message}
                  />
                </Box>
              )}
            />

            <Group gap={16} my={14}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Box flex={1}>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: formState.errors.email?.message ? "subRed" : "dark",
                      }}
                      label="Email"
                      placeholder="Email"
                      radius="sm"
                    />
                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.email?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="phone_number"
                control={control}
                render={({ field }) => (
                  <Box flex={1}>
                    <TextInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: formState.errors.email?.message ? "subRed" : "dark",
                      }}
                      label="Phone No."
                      placeholder="Phone No."
                      radius="sm"
                    />
                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.phone_number?.message}
                    />
                  </Box>
                )}
              />
            </Group>
          </Box>

          <Flex mt={30} gap={16}>
            <Button
              onClick={onClose}
              tt="uppercase"
              variant="outline"
              color="primary"
              c="primary"
              fullWidth
              type="button"
            >
              Cancel
            </Button>
            <EditAccountConfirmModal />
            {/* <AddAccountConfirmModal /> */}
          </Flex>
        </Paper>
      </form>
    </Modal>
  );
};

export default EditAccountModal;
