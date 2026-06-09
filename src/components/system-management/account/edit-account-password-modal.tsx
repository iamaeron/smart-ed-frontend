import ErrorMessage from "@/components/form/error-message";
import { api } from "@/lib/api";
import {
  accountPasswordSchema,
  type AccountPasswordData,
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
import type { EditAccountModalProps } from "./edit-account-modal";
import EditAccountPasswordConfirmModal from "./edit-account-password-confirm-modal";

const EditAccountPasswordModal = ({
  account,
  opened,
  onClose,
}: EditAccountModalProps) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState, setError, reset } =
    useForm<AccountPasswordData>({
      resolver: zodResolver(accountPasswordSchema),
      defaultValues: {
        new_pass: "",
        confirm_new_pass: "",
      },
    });

  const onSubmit: SubmitHandler<AccountPasswordData> = async (data) => {
    const payload = {
      password: data.new_pass,
      password_confirmation: data.confirm_new_pass,
    };

    try {
      const res = await api.post(
        `/api/users/${account.user_id}/change-password`,
        payload,
      );

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
      size="md"
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
            Change Password
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

      <form id="edit-account-password-form" onSubmit={handleSubmit(onSubmit)}>
        <Paper p="lg">
          <Box>
            <Controller
              name="new_pass"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.new_pass?.message ? "subRed" : "dark",
                    }}
                    label="New Password"
                    placeholder="Password"
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.new_pass?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="confirm_new_pass"
              control={control}
              render={({ field }) => (
                <Box mt={14}>
                  <TextInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.confirm_new_pass?.message
                        ? "subRed"
                        : "dark",
                    }}
                    label="Confirm Password"
                    placeholder="Password"
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.confirm_new_pass?.message}
                  />
                </Box>
              )}
            />
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
            <EditAccountPasswordConfirmModal />
            {/* <AddAccountConfirmModal /> */}
          </Flex>
        </Paper>
      </form>
    </Modal>
  );
};

export default EditAccountPasswordModal;
