import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import Fuse from "fuse.js";
import { useAddressStore } from "@/stores/address.store";
import provincesJson from "@/data/provinces.json";
import { useOutsideClick } from "@/hooks/use-outside-click";
import {
  Paper,
  rem,
  ScrollArea,
  TextInput,
  UnstyledButton,
} from "@mantine/core";

const ProvincePicker = () => {
  const [isFocused, setIsFocused] = useState(false);
  const provinces = useAddressStore((state) => state.provinces);
  const setId = useAddressStore((state) => state.setId);
  const province = useAddressStore((state) => state.province);
  const fuse = new Fuse(provincesJson, {
    keys: ["name"],
  });
  const ref = useRef(null);

  useOutsideClick(ref, () => setIsFocused(false));

  const handleOnFocus = useCallback(() => setIsFocused(true), []);

  const handleInput = useCallback(
    (e: any) => {
      setId("province", e.target.value);
      if (e.target.value) {
        const res = fuse.search(e.target.value);
        setId("provinces", res);
      } else {
        setId("provinces", provincesJson);
        setId("provinceId", 0);
      }
    },
    [provinces],
  );

  const handlePick = (provinceItem: { [k: string]: any }) => {
    setId(
      "provinceId",
      provinceItem.item ? provinceItem.item.prov_code : provinceItem.prov_code,
    );
    setId(
      "province",
      provinceItem.item
        ? provinceItem.item.name.toLowerCase()
        : provinceItem.name.toLowerCase(),
    );
    setId("city", "");
    setId("cityId", 0);
    setIsFocused(false);
  };

  const memoizedInput = useMemo(
    () => (
      <TextInput
        value={province}
        onChange={handleInput}
        onFocus={handleOnFocus}
        className="capitalize bg-zinc-50 focus:bg-white"
        placeholder="Province"
      />
    ),
    [province],
  );

  return (
    <div ref={ref} className="w-full relative">
      {memoizedInput}

      <Paper
        pos="absolute"
        mt="xs"
        p={4}
        w="100%"
        radius="md"
        shadow="sm"
        withBorder
        style={{
          zIndex: 1000, // Keeps the dropdown over other elements
          opacity: isFocused ? 1 : 0,
          pointerEvents: isFocused ? "auto" : "none",
          transition: "opacity 150ms ease", // Adds a smooth clean fade
        }}
      >
        <ScrollArea.Autosize mah={rem(320)}>
          {" "}
          {/* max-h-80 = 320px */}
          {provinces.map((provinceItem) => {
            const id = provinceItem.item
              ? provinceItem.item.id
              : provinceItem.id;
            const name = provinceItem.item
              ? provinceItem.item.name
              : provinceItem.name;

            return (
              <UnstyledButton
                key={id}
                type="button"
                onClick={() => handlePick(provinceItem)}
                display="block"
                w="100%"
                px="sm"
                py="xs"
                fs="sm"
                style={(theme) => ({
                  textTransform: "capitalize",
                  textAlign: "left",
                  fontSize: theme.fontSizes.sm,
                })}
              >
                {name.toLowerCase()}
              </UnstyledButton>
            );
          })}
        </ScrollArea.Autosize>
      </Paper>
    </div>
  );
};

export default memo(ProvincePicker);
