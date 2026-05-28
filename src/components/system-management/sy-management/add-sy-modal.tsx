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

const AddSYModal = () => {
  const [opened, { open, close }] = useDisclosure(false);

  const { control, handleSubmit, formState, watch } = useForm<AcademicYearData>(
    {
      resolver: zodResolver(academicYearSchema),
      defaultValues: {
        start_date: undefined,
        end_date: undefined,
        academic_year: "",
      },
    },
  );

  // Watch the form values instead of maintaining duplicate local state
  const startDate = watch("start_date");
  const endDate = watch("end_date");

  const onSubmit: SubmitHandler<AcademicYearData> = async (data) => {
    console.log(data);
    close();
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

        {/* FIX 1: Wrap inputs in an actual form element */}
        <form onSubmit={handleSubmit(onSubmit)}>
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
                render={({ field }) => (
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
                    />
                    {formState.errors.start_date?.message && (
                      <Flex justify="flex-end">
                        <Text mt={6} size="sm" c="subRed">
                          {formState.errors.start_date?.message}
                        </Text>
                      </Flex>
                    )}
                  </Box>
                )}
              />

              {/* FIX 2: Connect End Date to React Hook Form Controller as well */}
              <Controller
                name="end_date"
                control={control}
                render={({ field }) => (
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
                    />
                    {formState.errors.end_date?.message && (
                      <Flex justify="flex-end">
                        <Text mt={6} size="sm" c="subRed">
                          {formState.errors.end_date?.message}
                        </Text>
                      </Flex>
                    )}
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
              <Button tt="uppercase" color="primary" fullWidth type="submit">
                Save changes
              </Button>
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
