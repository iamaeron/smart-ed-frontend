import { memo, useEffect } from "react";
import ProvincePicker from "./province-picker";
import CityPicker from "./city-picker";
import BarangayPicker from "./barangay-picker";
import { Box, Grid, Select, Text, TextInput } from "@mantine/core";
import { useAddressStore } from "@/stores/address.store";
import { romanize } from "@/lib/romanize";
import AppTooltip from "@/components/system-management/app-tooltip";
import { Controller, useFormContext } from "react-hook-form";
import type { SchoolData } from "@/types/form/school.schema";

const AddressForm = () => {
  const region = useAddressStore((state) => state.region);
  const province = useAddressStore((state) => state.province);
  const city = useAddressStore((state) => state.city);
  const barangay = useAddressStore((state) => state.barangay);
  const street = useAddressStore((state) => state.street);
  const district = useAddressStore((state) => state.district);
  const setId = useAddressStore((state) => state.setId);

  const { control, setValue } = useFormContext<SchoolData>();

  useEffect(() => {
    setValue("province", province);
  }, [province, setValue]);

  useEffect(() => {
    setValue("city", city);
  }, [city, setValue]);

  useEffect(() => {
    setValue("barangay", barangay);
  }, [barangay, setValue]);

  useEffect(() => {
    setValue("street", street);
  }, [street, setValue]);

  useEffect(() => {
    setValue("district", district);
  }, [district, setValue]);

  useEffect(() => {
    setValue("region", region);
  }, [region, setValue]);

  return (
    <Box mt="md">
      <Grid>
        <Grid.Col span={6}>
          <Text mb={4} fw={600} fz={14}>
            Province
          </Text>
          <ProvincePicker />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text mb={4} fw={600} fz={14}>
            City
          </Text>
          <CityPicker />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text mb={4} fw={600} fz={14}>
            Barangay
          </Text>
          <BarangayPicker />
        </Grid.Col>
        <Grid.Col span={6}>
          <Controller
            name="street"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                {...field}
                value={street}
                onChange={(e) => {
                  setId("street", e.target.value);
                  field.onChange(e.target.value);
                }}
                labelProps={{
                  mb: 2,
                  fw: 400,
                  c: "dark",
                }}
                label="Street"
                radius="sm"
                error={fieldState.error?.message}
              />
            )}
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Controller
            name="district"
            control={control}
            render={({ field, fieldState }) => (
              <Select
                {...field}
                value={district}
                onChange={(value) => {
                  setId("district", value ?? "");
                  field.onChange(value ?? "");
                }}
                label="District"
                placeholder="District"
                data={["East", "West", "South", "North"]}
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
        </Grid.Col>

        <Grid.Col span={6}>
          <AppTooltip
            withArrow
            arrowOffset={17}
            position="bottom-start"
            label="Read only"
          >
            <Controller
              name="region"
              control={control}
              render={({ field }) => (
                <TextInput
                  {...field}
                  labelProps={{
                    mb: 2,
                    fw: 400,
                    c: "dark",
                  }}
                  value={romanize(Number(region)) ?? ""}
                  label="Region"
                  radius="sm"
                  readOnly
                />
              )}
            />
          </AppTooltip>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default memo(AddressForm);
