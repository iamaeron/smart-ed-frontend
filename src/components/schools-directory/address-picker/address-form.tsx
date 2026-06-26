import { memo, useEffect, useState } from "react";
import ProvincePicker from "./province-picker";
import CityPicker from "./city-picker";
import BarangayPicker from "./barangay-picker";
import { Box, Grid, Text, TextInput } from "@mantine/core";
import { useAddressStore } from "@/stores/address.store";
import { useDebouncedValue } from "@mantine/hooks";
import { romanize } from "@/lib/romanize";

const AddressForm = () => {
  const region = useAddressStore((state) => state.region);
  const street = useAddressStore((state) => state.street);
  const setId = useAddressStore((state) => state.setId);
  const [streetValue, setStreetValue] = useState("");
  const [debounced] = useDebouncedValue(streetValue, 1000);

  useEffect(() => {
    setId("street", debounced);
  }, [streetValue]);

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
          <TextInput
            value={streetValue}
            onChange={(e) => setStreetValue(e.target.value)}
            labelProps={{
              mb: 2,
              fw: 400,
              c: "dark",
              // c: formState.errors.school_name?.message
              //   ? "subRed"
              //   : "dark",
            }}
            label="Street"
            radius="sm"
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            value={streetValue}
            onChange={(e) => setStreetValue(e.target.value)}
            labelProps={{
              mb: 2,
              fw: 400,
              c: "dark",
              // c: formState.errors.school_name?.message
              //   ? "subRed"
              //   : "dark",
            }}
            label="District"
            radius="sm"
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <TextInput
            onChange={(e) => setStreetValue(e.target.value)}
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
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default memo(AddressForm);
