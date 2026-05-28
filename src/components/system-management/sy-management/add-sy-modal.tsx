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
import { useState } from "react";
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
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const { control, handleSubmit, formState, setError, getValues } =
    useForm<AcademicYearData>({
      resolver: zodResolver(academicYearSchema),
      defaultValues: {
        start_date: undefined,
        end_date: undefined,
        academic_year: "",
      },
    });

  const onSubmit: SubmitHandler<AcademicYearData> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        // title="Add New School Year"
        size="lg"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Add New School Year
            </Text>

            <ActionIcon onClick={close} variant="subtle" color="gray">
              <X size={18} />
            </ActionIcon>
          </Group>
        </Card>
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
                <Box>
                  <DateInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.academic_year?.message
                        ? "subRed"
                        : "grey",
                    }}
                    rightSection={<Calendar size={18} />}
                    label="Start Date"
                    flex={1}
                  />
                  {/* <TextInput
                    
                    error={formState.errors.username?.message ? true : false}
                    label="Username"
                    placeholder="Enter your username"
                  /> */}

                  <Flex justify="flex-end">
                    <Text mt={6} size="sm" c="subRed">
                      {formState.errors.academic_year?.message}
                    </Text>
                  </Flex>
                </Box>
              )}
            />

            <DateInput
              rightSection={<Calendar size={18} />}
              label="End Date"
              value={endDate}
              onChange={setEndDate}
              flex={1}
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
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit(onSubmit)}
              tt="uppercase"
              color="primary"
              fullWidth
            >
              Save changes
            </Button>
          </Flex>
        </Paper>
      </Modal>

      <Button onClick={open} leftSection={<Plus size={16} />}>
        Add School Year
      </Button>
    </>
  );
};

export default AddSYModal;
