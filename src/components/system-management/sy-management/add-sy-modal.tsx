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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Plus, X } from "lucide-react";
import { DateInput } from "@mantine/dates";
import dayjs from "dayjs";
import { Calendar } from "@solar-icons/react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  academicYearSchema,
  type AcademicYearData,
} from "@/types/form/academic-year.schema";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { api } from "@/lib/api";
import AddSYConfirmModal from "./add-sy-confirm-modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const AddSYModal = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit, formState, watch, setError, reset } =
    useForm<AcademicYearData>({
      resolver: zodResolver(academicYearSchema),
      defaultValues: {
        start_date: undefined,
        end_date: undefined,
      },
    });

  // Watch the form values instead of maintaining duplicate local state
  const startDate = watch("start_date");
  const endDate = watch("end_date");

  const onSubmit: SubmitHandler<AcademicYearData> = async (data) => {
    const payload = {
      start_date: dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const res = await api.post(`/api/academic-years`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["academic_years", {}] });
        reset();
        close();
      }
    } catch (err: any) {
      for (const [key, value] of Object.entries(err.response.data.errors)) {
        setError(key as keyof AcademicYearData, {
          message: (value as any[])[0] ?? "This field is required",
        });
      }
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
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Add New School Year
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

        <form id="academic-year-form" onSubmit={handleSubmit(onSubmit)}>
          <Paper p="lg">
            <Box mb={16}>
              <Text fw={600} fz={14}>
                School Year
              </Text>
              <Text size="lg" fw={600}>
                {!startDate || !endDate ? (
                  <>--</>
                ) : (
                  <>
                    {dayjs(startDate).format("YYYY")}-
                    {dayjs(endDate).format("YYYY")}
                  </>
                )}
              </Text>
            </Box>

            <Flex gap={8}>
              <Controller
                name="start_date"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <DateInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: formState.errors.start_date?.message
                          ? "subRed"
                          : "grey",
                      }}
                      rightSection={<Calendar size={18} />}
                      label="Start Date"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="end_date"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <DateInput
                      {...field}
                      labelProps={{
                        mb: 6,
                        fw: 400,
                        c: formState.errors.end_date?.message
                          ? "subRed"
                          : "grey",
                      }}
                      rightSection={<Calendar size={18} />}
                      label="End Date"
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />
            </Flex>

            <Flex mt={20} gap={8}>
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
              <AddSYConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add School Year
      </Button>
    </>
  );
};

export default AddSYModal;
