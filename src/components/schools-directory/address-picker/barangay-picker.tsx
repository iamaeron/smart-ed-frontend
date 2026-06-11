import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useAddressStore } from "@/stores/address.store";
import barangaysJson from "@/data/barangays.json";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { TextInput } from "@mantine/core";

const BarangayPicker = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [input, setInput] = useState("");
  const provinceId = useAddressStore((state) => state.provinceId);
  const cityId = useAddressStore((state) => state.cityId);
  const barangays = useAddressStore((state) => state.barangays);
  const barangay = useAddressStore((state) => state.barangay);
  const setId = useAddressStore((state) => state.setId);

  const filteredBarangays = useMemo(() => {
    return (barangaysJson as { [k: string]: string }[]).filter(
      (k) => k.mun_code === cityId,
    );
  }, [provinceId, cityId]);

  const fuse = new Fuse(filteredBarangays, {
    keys: ["name"],
  });
  const ref = useRef(null);

  useEffect(() => {
    setId("barangays", filteredBarangays);

    if (cityId === 0 || provinceId === 0) setId("barangay", "");
  }, [cityId, provinceId]);

  useOutsideClick(ref, () => setIsFocused(false));

  const handleOnFocus = useCallback(() => setIsFocused(true), []);

  const handleInput = useCallback(
    (e: any) => {
      setId("barangay", e.target.value);
      if (e.target.value) {
        const res = fuse.search(e.target.value);
        setId("barangays", res);
      } else {
        setId("barangays", filteredBarangays);
        setId("barangayId", 0);
      }
    },
    [barangays],
  );

  const handlePick = (barangayItem: { [k: string]: any }) => {
    setId(
      "barangayId",
      barangayItem.item ? barangayItem.item.prov_code : barangayItem.prov_code,
    );
    setId(
      "barangay",
      barangayItem.item
        ? barangayItem.item.name.toLowerCase()
        : barangayItem.name.toLowerCase(),
    );
    setIsFocused(false);
  };

  const memoizedInput = useMemo(
    () => (
      <TextInput
        value={barangay}
        onChange={handleInput}
        onFocus={handleOnFocus}
        // className="capitalize bg-zinc-50 focus:bg-white"
        placeholder="Barangay"
        disabled={provinceId !== 0 && cityId !== 0 ? false : true}
      />
    ),
    [barangay, provinceId, cityId],
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
        {barangays.map((barangayItem) =>
          barangayItem.item ? (
            <button
              type="button"
              onClick={() => handlePick(barangayItem)}
              key={barangayItem.item.id}
              className="block text-sm px-2 py-1.5 hover:bg-zinc-100 rounded w-full text-left capitalize"
            >
              {barangayItem.item.name.toLowerCase()}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => handlePick(barangayItem)}
              key={barangayItem.id}
              className="block text-sm px-2 py-1.5 hover:bg-zinc-100 rounded w-full text-left capitalize"
            >
              {barangayItem.name.toLowerCase()}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default memo(BarangayPicker);
