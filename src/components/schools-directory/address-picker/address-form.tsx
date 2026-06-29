import { memo } from "react";
import ProvincePicker from "./province-picker";
import CityPicker from "./city-picker";
import BarangayPicker from "./barangay-picker";
import { Box, Grid, Select, Text, TextInput } from "@mantine/core";
import { useAddressStore } from "@/stores/address.store";
import { romanize } from "@/lib/romanize";
import AppTooltip from "@/components/system-management/app-tooltip";

const AddressForm = () => {
  const region = useAddressStore((state) => state.region);
  const street = useAddressStore((state) => state.street);
  const setId = useAddressStore((state) => state.setId);

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
            value={street}
            onChange={(e) => setId("street", e.target.value)}
            labelProps={{
              mb: 2,
              fw: 400,
              c: "dark",
            }}
            label="Street"
            radius="sm"
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <Select
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
          />
        </Grid.Col>

        <Grid.Col span={6}>
          <AppTooltip
            withArrow
            arrowOffset={17}
            position="bottom-start"
            label="Read only"
          >
            <TextInput
              labelProps={{
                mb: 2,
                fw: 400,
                c: "dark",
              }}
              defaultValue={romanize(Number(region)) ?? ""}
              label="Region"
              radius="sm"
              readOnly
            />
          </AppTooltip>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default memo(AddressForm);
