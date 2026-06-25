import { schoolSchema, type SchoolData } from "@/types/form/school.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Grid,
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
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "../form/error-message";
import { useFetchSchoolTypes } from "@/lib/fetcher/school.fetcher";
import SchoolHeadPicker from "./school-head-picker";
import FormMap from "./form-map";
import AddressPicker from "./address-picker/address-form";

const AddSchoolModal = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: schoolTypes, isPending } = useFetchSchoolTypes();
  const { control, handleSubmit, formState, setError, reset } =
    useForm<SchoolData>({
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
      },
    });

  const schoolTypesList =
    schoolTypes?.results?.school_types.map((school: any) => school.name) || [];

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
                  render={({ field }) => (
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
                        required
                      />
                      <ErrorMessage
                        atEnd={false}
                        error={formState.errors.school_name?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="school_code"
                  control={control}
                  render={({ field }) => (
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
                        required
                      />
                      <ErrorMessage
                        atEnd={false}
                        error={formState.errors.school_code?.message}
                      />
                    </Box>
                  )}
                />
              </Group>

              <Group gap={16} my={14}>
                <Controller
                  name="year_established"
                  control={control}
                  render={({ field }) => (
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
                      />
                      <ErrorMessage
                        atEnd={false}
                        error={formState.errors.year_established?.message}
                      />
                    </Box>
                  )}
                />

                <Controller
                  name="school_type"
                  control={control}
                  render={({ field }) => (
                    <Box flex={1}>
                      <Select
                        {...field}
                        allowDeselect={false}
                        label="Role"
                        labelProps={{ style: { marginBottom: 6 } }}
                        placeholder="Search Type ..."
                        rightSection={<ChevronDown size={16} />}
                        radius="sm"
                        searchable
                        comboboxProps={{
                          shadow: "xl",
                        }}
                        data={schoolTypesList}
                      />
                      <ErrorMessage
                        atEnd={false}
                        error={formState.errors.school_code?.message}
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

              <Grid mt="sm">
                <Grid.Col span={6}>
                  <TextInput
                    // value={streetValue}
                    leftSection={<Text size="sm">X :</Text>}
                    // onChange={(e) => setStreetValue(e.target.value)}
                    labelProps={{
                      mb: 2,
                      fw: 400,
                      c: "dark",
                      // c: formState.errors.school_name?.message
                      //   ? "subRed"
                      //   : "dark",
                    }}
                    // label="District"
                    radius="sm"
                  />
                </Grid.Col>

                <Grid.Col span={6}>
                  <TextInput
                    // value={streetValue}
                    // onChange={(e) => setStreetValue(e.target.value)}
                    leftSection={<Text size="sm">Y :</Text>}
                    labelProps={{
                      mb: 2,
                      fw: 400,
                      c: "dark",
                      // c: formState.errors.school_name?.message
                      //   ? "subRed"
                      //   : "dark",
                    }}
                    // label="District"
                    radius="sm"
                  />
                </Grid.Col>
              </Grid>
            </Box>
          </Flex>
        </Paper>
      </Modal>
      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add School
      </Button>
    </>
  );
};

export default AddSchoolModal;
