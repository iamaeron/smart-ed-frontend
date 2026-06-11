import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useAddressStore } from "@/stores/address.store";
import citiesJson from "@/data/city-mun.json";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { TextInput } from "@mantine/core";

const CityPicker = () => {
  const [isFocused, setIsFocused] = useState(false);
  const provinceId = useAddressStore((state) => state.provinceId);
  const cities = useAddressStore((state) => state.cities);
  const city = useAddressStore((state) => state.city);
  const setId = useAddressStore((state) => state.setId);
  const filteredCities = useMemo(() => {
    return citiesJson.filter((k) => k.prov_code === provinceId);
  }, [provinceId]);

  const fuse = new Fuse(filteredCities, {
    keys: ["name"],
  });
  const ref = useRef(null);

  useEffect(() => {
    setId("cities", filteredCities);

    if (provinceId === 0) setId("city", "");
  }, [provinceId]);

  useOutsideClick(ref, () => setIsFocused(false));

  const handleOnFocus = useCallback(() => setIsFocused(true), []);

  const handleInput = useCallback(
    (e: any) => {
      setId("city", e.target.value);
      if (e.target.value) {
        const res = fuse.search(e.target.value);
        setId("cities", res);
      } else {
        setId("cities", filteredCities);
        setId("cityId", 0);
      }
    },
    [cities],
  );

  const handlePick = (cityItem: { [k: string]: any }) => {
    setId("cityId", cityItem.item ? cityItem.item.mun_code : cityItem.mun_code);
    setId(
      "city",
      cityItem.item
        ? cityItem.item.name.toLowerCase()
        : cityItem.name.toLowerCase(),
    );
    setId("barangay", "");
    setId("barangayId", 0);
    setIsFocused(false);
  };

  const memoizedInput = useMemo(
    () => (
      <TextInput
        value={city}
        onChange={handleInput}
        onFocus={handleOnFocus}
        // className="capitalize bg-zinc-50 focus:bg-white"
        placeholder="City"
        disabled={provinceId !== 0 ? false : true}
      />
    ),
    [city, provinceId],
  );

  return (
    <div ref={ref} className="w-full relative">
      {memoizedInput}

      <div
        className={[
          "max-h-80 overflow-y-auto absolute mt-2 p-1 w-full rounded-lg bg-white shadow border !border-black/[0.1]",
          isFocused
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {cities.map((cityItem) =>
          cityItem.item ? (
            <button
              type="button"
              onClick={() => handlePick(cityItem)}
              key={cityItem.item.id}
              className="block text-sm px-2 py-1.5 hover:bg-zinc-100 rounded w-full text-left capitalize"
            >
              {cityItem.item.name.toLowerCase()}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handlePick(cityItem)}
              key={cityItem.id}
              className="block text-sm px-2 py-1.5 hover:bg-zinc-100 rounded w-full text-left capitalize"
            >
              {cityItem.name.toLowerCase()}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default memo(CityPicker);
