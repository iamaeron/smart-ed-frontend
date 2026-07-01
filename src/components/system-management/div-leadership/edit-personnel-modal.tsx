import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import {
  personnelSchema,
  type PersonnelData,
} from "@/types/form/personnel.schema";
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
  Radio,
  Select,
  Checkbox,
} from "@mantine/core";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ChevronDown, X } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { useEffect, useState } from "react";
import type { Personnel } from "@/types/data/personnel.type";
import EditPersonnelConfirmModal from "./edit-personnel-confirm-modal";

export type EditPersonnelModalProps = {
  personnel: Personnel;
  opened: boolean;
  onClose: () => void;
};

const EditPersonnelModal = ({
  personnel,
  onClose,
  opened,
}: EditPersonnelModalProps) => {
  const queryClient = useQueryClient();
  const { data } = useFetchAcademicYears();
  const [currentlyInTerm, setCurrentlyInTerm] = useState(
    personnel.is_current ?? false,
  );
  const currentYear = dayjs().year();

  const termStartData =
    data?.results?.data
      .map((d: any) => dayjs(d.start_date).format("YYYY"))
      .filter((v: string) => Number(v) <= currentYear) || [];
  const termEndData =
    data?.results?.data.map((d: any) => dayjs(d.end_date).format("YYYY")) || [];

  const defValues = {
    name: personnel.name,
    position: personnel.position.replace("OIC, ", ""),
    is_oic: personnel.is_oic ? "true" : "false",
    term_start: personnel.term_start,
    term_end: personnel.term_end,
    current_term: personnel.is_current ? "true" : "false",
  };

  const { control, handleSubmit, formState, setError, reset, setValue, watch } =
    useForm<PersonnelData>({
      resolver: zodResolver(personnelSchema),
      defaultValues: defValues,
    });

  useEffect(() => {
    if (personnel) {
      reset(defValues);
    }
  }, [personnel, reset]);

  const termStart = watch("term_start");

  const onSubmit: SubmitHandler<PersonnelData> = async (data) => {
    const payload = {
      name: data.name,
      position: data.position,
      is_oic: data.is_oic === "true",
      term_start: Number(data.term_start),
      term_end: currentlyInTerm ? null : Number(data.term_end),
      current_term: currentlyInTerm,
    };

    try {
      const res = await api.put(
        `/api/division-leaderships/${personnel.id}`,
        payload,
      );

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["division_leadership", {}],
        });
        setCurrentlyInTerm(false);
        reset();
        onClose();
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
        onClose={onClose}
        size="xl"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Edit Personnel Details
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

        <form id="edit-personnel-form" onSubmit={handleSubmit(onSubmit)}>
          <Paper p="lg">
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
                      c: formState.errors.name?.message ? "subRed" : "dark",
                    }}
                    label="Name"
                    radius="sm"
                    error={fieldState.error?.message}
                  />
                </Box>
              )}
            />

            <Group gap={16} my={20}>
              <Controller
                name="position"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <Select
                      {...field}
                      allowDeselect={false}
                      label="Position"
                      rightSection={<ChevronDown size={16} />}
                      radius="sm"
                      comboboxProps={{
                        shadow: "xl",
                      }}
                      data={[
                        "Schools Division Superintendent",
                        "Assistant Schools Division Superintendent",
                      ]}
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="is_oic"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <Text fz={14} fw={600}>
                      Officer in Charge
                    </Text>
                    <Radio.Group error={fieldState.error?.message} {...field}>
                      <Group my={8}>
                        <Box flex={1}>
                          <Radio label="Yes" value="true" />
                        </Box>
                        <Box flex={1}>
                          <Radio label="No" value="false" />
                        </Box>
                      </Group>
                    </Radio.Group>
                  </Box>
                )}
              />
            </Group>

            <Group gap={16} my={14}>
              <Controller
                name="term_start"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1}>
                    <Select
                      {...field}
                      allowDeselect={false}
                      label="Term Start"
                      rightSection={<ChevronDown size={16} />}
                      radius="sm"
                      comboboxProps={{
                        shadow: "xl",
                      }}
                      data={termStartData}
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="term_end"
                control={control}
                render={({ field, fieldState }) => (
                  <Box flex={1} pos="relative">
                    <Checkbox
                      size="xs"
                      labelPosition="left"
                      style={{ position: "absolute", right: 0, top: 4 }}
                      label="Currently in term"
                      checked={currentlyInTerm}
                      onChange={(e) => {
                        setCurrentlyInTerm(e.target.checked);
                        setValue(
                          "current_term",
                          e.target.checked ? "true" : "false",
                        );
                      }}
                    />
                    <Select
                      {...field}
                      disabled={currentlyInTerm}
                      allowDeselect={false}
                      label="Term End"
                      rightSection={<ChevronDown size={16} />}
                      radius="sm"
                      comboboxProps={{
                        shadow: "xl",
                      }}
                      data={
                        termStart
                          ? termEndData.filter(
                              (year: string) =>
                                Number(year) >= Number(termStart),
                            )
                          : termEndData
                      }
                      error={fieldState.error?.message}
                    />
                  </Box>
                )}
              />
            </Group>

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
              <EditPersonnelConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>
    </>
  );
};

export default EditPersonnelModal;
