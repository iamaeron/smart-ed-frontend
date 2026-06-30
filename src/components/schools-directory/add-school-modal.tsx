import { schoolSchema, type SchoolData } from "@/types/form/school.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Modal,
  Paper,
  Select,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronDown, Plus, X } from "lucide-react";
import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import SchoolHeadPicker from "./school-head-picker";
import FormMap from "./form-map";
import AddressPicker from "./address-picker/address-form";
import AddSchoolConfirmModal from "./add-school-confirm-modal";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAddressStore } from "@/stores/address.store";
import { romanize } from "@/lib/romanize";

const AddSchoolModal = () => {
  const queryClient = useQueryClient();
  const resetAddress = useAddressStore((state) => state.resetAddress);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: schoolTypes, isPending } = useFetchSchoolTypes();
  const formMethods = useForm<SchoolData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      school_name: "",
      school_code: "",
      year_established: "",
      school_type: "",
      school_type_id: "",
      school_head: "",
      position: "",
      street: "",
      barangay: "",
      city: "",
      province: "",
      region: "",
      district: "",
      latitude: "",
      longitude: "",
    },
  });
  const { control, handleSubmit, formState, setError, reset } = formMethods;

  const schoolTypesList =
    schoolTypes?.results?.school_types.map((school: any) => school.name) || [];

  const onSubmit: SubmitHandler<SchoolData> = async (data) => {
    try {
      const res = await api.post(`/api/schools`, {
        ...data,
        region: `Region ${romanize(Number(data.region))}`,
      });

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["schools", {}],
        });
        reset();
        resetAddress();
        close();
      }
    } catch (err: any) {
      const fieldErrors = err.response?.data?.errors;
      if (fieldErrors) {
        Object.entries(fieldErrors).forEach(([field, message]) => {
          setError(field as keyof SchoolData, { message: message as string });
        });
      } else {
        setError("root", {
          message: err.response?.data?.message ?? "Something went wrong",
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
        size="75vw"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Add School
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

        <FormProvider {...formMethods}>
          <form id="new-school-form" onSubmit={handleSubmit(onSubmit)}>
            <Paper p="sm">
              <Flex>
                <Box p="lg" flex={1}>
                  <Title order={5} mb={14}>
                    General Information
                  </Title>

                  <Group gap={16} my={14}>
                    <Controller
                      name="school_name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Box flex={1}>
                          <TextInput
                            {...field}
                            labelProps={{
                              mb: 6,
                              fw: 400,
                              c: formState.errors.school_name?.message
                                ? "subRed"
                                : "dark",
                            }}
                            label="School Name"
                            radius="sm"
                            error={fieldState.error?.message}
                          />
                        </Box>
                      )}
                    />

                    <Controller
                      name="school_code"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Box flex={1}>
                          <TextInput
                            {...field}
                            labelProps={{
                              mb: 6,
                              fw: 400,
                              c: formState.errors.school_code?.message
                                ? "subRed"
                                : "dark",
                            }}
                            label="School ID"
                            radius="sm"
                            error={fieldState.error?.message}
                          />
                        </Box>
                      )}
                    />
                  </Group>

                  <Group gap={16} my={14}>
                    <Controller
                      name="year_established"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Box flex={1}>
                          <TextInput
                            {...field}
                            labelProps={{
                              mb: 6,
                              fw: 400,
                              c: formState.errors.year_established?.message
                                ? "subRed"
                                : "dark",
                            }}
                            label="Year Established"
                            radius="sm"
                            error={fieldState.error?.message}
                          />
                        </Box>
                      )}
                    />

                    <Controller
                      name="school_type"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Box flex={1}>
                          <Select
                            {...field}
                            allowDeselect={false}
                            label="School Type"
                            labelProps={{ style: { marginBottom: 6 } }}
                            placeholder="Search Type ..."
                            rightSection={<ChevronDown size={16} />}
                            radius="sm"
                            searchable
                            comboboxProps={{
                              shadow: "xl",
                            }}
                            data={schoolTypesList}
                            error={fieldState.error?.message}
                          />
                        </Box>
                      )}
                    />
                  </Group>

                  <SchoolHeadPicker control={control} formState={formState} />
                </Box>

                {/* <Divider orientation="vertical" /> */}

                <Box p="lg" flex={1}>
                  <Title order={5} mb={14}>
                    Address
                  </Title>
                  <AddressPicker />

                  <Divider mt={24} mb={12} />

                  <Title order={5} mb={14}>
                    Map Coordirnates
                  </Title>
                  <FormMap />
                </Box>
              </Flex>

              <Flex p="lg" gap="xl">
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
                <AddSchoolConfirmModal />
              </Flex>
            </Paper>
          </form>
        </FormProvider>
      </Modal>
      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add School
      </Button>
    </>
  );
};

export default AddSchoolModal;
