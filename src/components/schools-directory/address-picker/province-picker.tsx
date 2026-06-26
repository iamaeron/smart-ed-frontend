import { memo } from "react";
import provincesJson from "@/data/provinces.json";
import { useAddressStore } from "@/stores/address.store";
import AddressPicker from "./address-picker";

const ProvincePicker = () => {
  const provinceId = useAddressStore((s) => s.provinceId);
  const setId = useAddressStore((s) => s.setId);

  const handleSelect = (province: any) => {
    setId("provinceId", province.prov_code);
    setId("region", province.reg_code);
    setId("province", province.name.toLowerCase());
    // Reset dependents
    setId("cityId", 0);
    setId("city", "");
    setId("barangayId", 0);
    setId("barangay", "");
  };

  const handleClear = () => {
    setId("provinceId", 0);
    setId("province", "");
    setId("region", "");
    setId("cityId", 0);
    setId("city", "");
    setId("barangayId", 0);
    setId("barangay", "");
  };

  return (
    <AddressPicker
      placeholder="Province"
      value={provinceId}
      dataList={provincesJson}
      valueKey="prov_code"
      onSelect={handleSelect}
      onClear={handleClear}
    />
  );
};

export default memo(ProvincePicker);
