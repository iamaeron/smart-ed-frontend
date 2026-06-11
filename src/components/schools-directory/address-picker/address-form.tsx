import { memo } from "react";
import ProvincePicker from "./province-picker";
import CityPicker from "./city-picker";
import BarangayPicker from "./barangay-picker";
import { Group } from "@mantine/core";

const AddressForm = () => {
  return (
    <div>
      <div className="flex gap-4">
        <Group>
          {/* <InputLabel className="font-semibold mb-1">
                        Province
                        <span className="inline ml-1 text-rose-600">*</span>
                    </InputLabel> */}
          <ProvincePicker />
          {/* <InputLabel className="font-semibold mb-1">
                        City
                        <span className="inline ml-1 text-rose-600">*</span>
                    </InputLabel> */}
          <CityPicker />
        </Group>
        <div className="flex-1">
          {/* <InputLabel className="font-semibold mb-1">
                        Barangay
                    </InputLabel> */}
          <BarangayPicker />
        </div>
      </div>
    </div>
  );
};

export default memo(AddressForm);
