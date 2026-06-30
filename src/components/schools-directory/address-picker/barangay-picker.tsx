import { memo, useMemo } from "react";
import barangaysJson from "@/data/barangays.json";
import { useAddressStore } from "@/stores/address.store";
import AddressPicker from "./address-picker";

const BarangayPicker = () => {
  const cityId = useAddressStore((s) => s.cityId);
  const barangayId = useAddressStore((s) => s.barangayId);
  const setId = useAddressStore((s) => s.setId);

  const filteredBarangays = useMemo(() => {
    return (barangaysJson as { [k: string]: string }[]).filter(
      (b) => b.mun_code === cityId,
    );
  }, [cityId]);

  const handleSelect = (barangay: any) => {
    setId("barangayId", barangay.id);
    setId("barangay", barangay.name.toLowerCase());
  };

  const handleClear = () => {
    setId("barangayId", 0);
    setId("barangay", "");
  };

  return (
    <AddressPicker
      pickerName="barangay"
      placeholder="Barangay"
      value={barangayId}
      dataList={filteredBarangays}
      valueKey="id"
      disabled={!cityId}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  );
};

export default memo(BarangayPicker);
