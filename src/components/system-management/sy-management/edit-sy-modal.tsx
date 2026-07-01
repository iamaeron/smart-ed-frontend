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
import { X } from "lucide-react";
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
import EditSYConfirmModal from "./edit-sy-confirm-modal";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorMessage from "@/components/form/error-message";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { useEffect } from "react";

export type EditSYModalProps = {
  sy: AcademicYear;
  opened: boolean;
  onClose: () => void;
};

const EditSYModal = ({ sy, opened, onClose }: EditSYModalProps) => {
  const queryClient = useQueryClient();

  const defValues = {
    start_date: dayjs(sy.start_date).toDate(),
    end_date: dayjs(sy.end_date).toDate(),
  };

  const { control, handleSubmit, formState, watch, setError, reset } =
    useForm<AcademicYearData>({
      resolver: zodResolver(academicYearSchema),
      defaultValues: defValues,
    });

  useEffect(() => {
    if (sy) {
      reset(defValues);
    }
  }, [sy, reset]);

  // Watch the form values instead of maintaining duplicate local state
  const startDate = watch("start_date");
  const endDate = watch("end_date");

  const onSubmit: SubmitHandler<AcademicYearData> = async (data) => {
    const startYear = dayjs(data.start_date).format("YYYY");
    const endYear = dayjs(data.end_date).format("YYYY");

    const payload = {
      academic_year: `S.Y. ${startYear}-${endYear}`,
      start_date: dayjs(data.start_date).format("YYYY-MM-DD HH:mm:ss"),
      end_date: dayjs(data.end_date).format("YYYY-MM-DD HH:mm:ss"),
    };

    try {
      const res = await api.put(`/api/academic-years/${sy.year_id}`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["academic_years", {}] });
        reset();
        onClose();
      }
    } catch (err: any) {
      setError("end_date", { message: "Error" });
      setError("start_date", { message: "Error" });
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={onClose}
        size="lg"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Edit School Year
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

        <form id="edit-academic-year-form" onSubmit={handleSubmit(onSubmit)}>
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

              <EditSYConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>
    </>
  );
};

export default EditSYModal;
