import { memo, useMemo } from "react";
import citiesJson from "@/data/city-mun.json";
import { useAddressStore } from "@/stores/address.store";
import AddressPicker from "./address-picker";

const CityPicker = () => {
  const provinceId = useAddressStore((s) => s.provinceId);
  const cityId = useAddressStore((s) => s.cityId);
  const setId = useAddressStore((s) => s.setId);

  const filteredCities = useMemo(
    () => citiesJson.filter((c) => c.prov_code === provinceId),
    [provinceId],
  );

  const handleSelect = (city: any) => {
    setId("cityId", city.mun_code);
    setId("city", city.name.toLowerCase());
    // Reset dependents
    setId("barangayId", 0);
    setId("barangay", "");
  };

  const handleClear = () => {
    setId("cityId", 0);
    setId("city", "");
    setId("barangayId", 0);
    setId("barangay", "");
  };

  return (
    <AddressPicker
      pickerName="city"
      placeholder="City / Municipality"
      value={cityId}
      dataList={filteredCities}
      valueKey="mun_code"
      disabled={!provinceId}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  );
};

export default memo(CityPicker);
