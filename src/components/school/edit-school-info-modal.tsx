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
import { ChevronDown, X } from "lucide-react";
import {
  Controller,
  FormProvider,
  useForm,
  type SubmitHandler,
} from "react-hook-form";
import AddressPicker from "../schools-directory/address-picker/address-form";
import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import { useDisclosure } from "@mantine/hooks";
import { schoolSchema, type SchoolData } from "@/types/form/school.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";
import { romanize } from "@/lib/romanize";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useAddressStore } from "@/stores/address.store";
import { useEffect } from "react";
import { resolveAddressIds } from "@/lib/resolve-address";
import EditSchoolDataConfirmModal from "./edit-school-data-confirm-modal";

const EditSchoolInfoModal = ({
  school,
  loading,
  review,
  submissionId,
}: {
  school: Record<any, any>;
  loading: boolean;
  review?: boolean;
  submissionId?: string;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { data: schoolTypes, isPending } = useFetchSchoolTypes(
    {},
    { enabled: opened },
  );
  const formMethods = useForm<SchoolData>({
    resolver: zodResolver(schoolSchema),
    defaultValues: {
      school_name: school.school_name,
      school_code: school.school_code,
      position: school.school_head.position,
      year_established: school.year_established,
      school_type: school.school_type.name,
      // school_type_id: "",
      school_head: school.school_head.name,
      street: school.address.street,
      barangay: school.address.barangay,
      city: school.address.city,
      province: school.address.province,
      region: school.region,
      district: school.district,
      longitude: school.longitude,
      latitude: school.latitude,
      phone_number: school.school_head.phone_number,
      email: school.school_head.head_email,
    },
  });
  const { control, handleSubmit, formState } = formMethods;

  const schoolTypesList =
    schoolTypes?.results?.school_types.map((school: any) => school.name) || [];

  const { hydrateAddress, resetAddress } = useAddressStore();

  useEffect(() => {
    if (!opened) return;

    if (opened) {
      const resolved = resolveAddressIds({
        province: school.address.province,
        city: school.address.city,
        barangay: school.address.barangay,
      });
      hydrateAddress({
        ...resolved,
        street: school.address.street ?? "",
        district: school.district ?? "",
        coordinates: [school.latitude, school.longitude],
      });
    } else {
      resetAddress();
    }
  }, [opened, school]);

  const onSubmit: SubmitHandler<SchoolData> = async (data) => {
    const formData = new FormData();

    if (review) formData.append("_method", "PUT");
    formData.append("type", "information");

    Object.entries(data).forEach(([k, v]) => {
      if (k === "region") {
        formData.append(`details[0][${k}]`, `Region ${romanize(Number(v))}`);
        return;
      }

      formData.append(`details[0][${k}]`, v ?? "");
    });

    console.log(formData);

    try {
      const reqFunc = review
        ? api.post(`/api/submissions/${submissionId}`, formData)
        : api.post(`/api/submissions`, formData);

      const res = await reqFunc;

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        if (review) {
          queryClient.invalidateQueries({
            queryKey: ["submission", submissionId, {}],
          });
        }
        close();
      }
    } catch (err: any) {
      console.log(err);
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
              Edit School Information
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
          <form
            id="edit-school-data-form"
            onSubmit={handleSubmit(
              onSubmit,
              // (error) => console.log(error),
            )}
          >
            <Paper p="lg">
              <Box>
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

                <Divider mt={24} mb={12} />

                <Title order={5} mb={14}>
                  Address
                </Title>
                <AddressPicker />

                <Divider mt={24} mb={12} />

                <Title order={5} mb={14}>
                  School Head
                </Title>

                <Controller
                  name="school_head"
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
                        label="Name"
                        radius="sm"
                        error={fieldState.error?.message}
                      />
                    </Box>
                  )}
                />

                <Group gap={16} my={14}>
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
                          label="Phone Number"
                          radius="sm"
                          error={fieldState.error?.message}
                        />
                      </Box>
                    )}
                  />

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
                            c: fieldState.error?.message ? "subRed" : "dark",
                          }}
                          label="Email"
                          radius="sm"
                          error={fieldState.error?.message}
                        />
                      </Box>
                    )}
                  />
                </Group>

                <Controller
                  name="position"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Select
                      {...field}
                      label="Position"
                      placeholder="Select Position"
                      data={[
                        "Principal I",
                        "Principal II",
                        "Principal III",
                        "Principal IV",
                      ]}
                      searchable
                      clearable
                      radius="sm"
                      nothingFoundMessage="No results found"
                      comboboxProps={{
                        shadow: "xl",
                      }}
                      styles={{
                        input: { textTransform: "capitalize" },
                        option: { textTransform: "capitalize" },
                      }}
                      className="w-full"
                      error={fieldState.error?.message}
                    />
                  )}
                />
              </Box>

              <Flex mt="lg" gap="lg">
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
                <EditSchoolDataConfirmModal fullWidth />
              </Flex>
            </Paper>
          </form>
        </FormProvider>
      </Modal>
      <Button
        onClick={open}
        size="compact-sm"
        radius="sm"
        px="md"
        variant="outline"
        color="blue"
      >
        Edit
      </Button>
    </>
  );
};

export default EditSchoolInfoModal;
