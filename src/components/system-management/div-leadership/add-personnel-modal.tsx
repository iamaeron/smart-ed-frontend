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
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { ArrowDown, ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import AddPersonnelConfirmModal from "./add-personnel-confirm-modal";
import ErrorMessage from "@/components/form/error-message";
import { toast } from "sonner";
import { api } from "@/lib/api";

const AddPersonnelModal = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { data, isPending: isAcademicYearsPending } = useFetchAcademicYears();

  const termStartData =
    data?.results?.data.map((d: any) => dayjs(d.start_date).format("YYYY")) ||
    [];
  const termEndData =
    data?.results?.data.map((d: any) => dayjs(d.end_date).format("YYYY")) || [];

  const { control, handleSubmit, formState, watch, setValue, setError, reset } =
    useForm<PersonnelData>({
      resolver: zodResolver(personnelSchema),
      defaultValues: {
        name: "",
        position: "Schools Division Superintendent",
        is_oic: "true",
        term_start: "",
        term_end: "",
      },
    });

  const onSubmit: SubmitHandler<PersonnelData> = async (data) => {
    const payload = {
      name: data.name,
      position: data.position,
      is_oic: data.is_oic === "true",
      term_start: Number(data.term_start),
      term_end: Number(data.term_end),
    };

    try {
      const res = await api.post(`/api/division-leaderships`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["division_leadership", {}],
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
        size="xl"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
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

        <form id="new-personnel-form" onSubmit={handleSubmit(onSubmit)}>
          <Paper p="lg">
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
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.name?.message}
                  />
                </Box>
              )}
            />

            <Group gap={16} my={20}>
              <Controller
                name="position"
                control={control}
                render={({ field }) => (
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
                    />
                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.position?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="is_oic"
                control={control}
                render={({ field }) => (
                  <Box flex={1}>
                    <Text fz={14} fw={600}>
                      Officer in Charge
                    </Text>
                    <Radio.Group {...field}>
                      <Group my={8}>
                        <Box flex={1}>
                          <Radio label="Yes" value="true" />
                        </Box>
                        <Box flex={1}>
                          <Radio label="No" value="false" />
                        </Box>
                      </Group>
                    </Radio.Group>

                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.is_oic?.message}
                    />
                  </Box>
                )}
              />
            </Group>

            <Group gap={16} my={14}>
              <Controller
                name="term_start"
                control={control}
                render={({ field }) => (
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
                    />
                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.term_start?.message}
                    />
                  </Box>
                )}
              />

              <Controller
                name="term_end"
                control={control}
                render={({ field }) => (
                  <Box flex={1}>
                    <Select
                      {...field}
                      allowDeselect={false}
                      label="Term End"
                      rightSection={<ChevronDown size={16} />}
                      radius="sm"
                      comboboxProps={{
                        shadow: "xl",
                      }}
                      data={termEndData}
                    />
                    <ErrorMessage
                      atEnd={false}
                      error={formState.errors.term_end?.message}
                    />
                  </Box>
                )}
              />
            </Group>

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
              <AddPersonnelConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add Personnel
      </Button>
    </>
  );
};

export default AddPersonnelModal;
