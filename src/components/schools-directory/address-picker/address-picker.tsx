import { useMemo } from "react";
import { Select } from "@mantine/core";
import Fuse from "fuse.js";
import { Controller, useFormContext } from "react-hook-form";
import type { SchoolData } from "@/types/form/school.schema";

interface AddressPickerProps {
  label?: string;
  placeholder: string;
  value: string | number;
  dataList: any[];
  disabled?: boolean;
  valueKey: string; // e.g. 'prov_code', 'mun_code', 'id'
  onSelect: (item: any) => void;
  onClear: () => void;
  pickerName: "province" | "city" | "barangay";
}

const AddressPicker = ({
  label,
  placeholder,
  value,
  dataList,
  disabled = false,
  valueKey,
  onSelect,
  onClear,
  pickerName,
}: AddressPickerProps) => {
  const { control } = useFormContext<SchoolData>();

  const selectData = useMemo(
    () =>
      dataList.map((item) => {
        const raw = item.item ?? item;
        return {
          value: String(raw[valueKey]),
          label: raw.name.toLowerCase(),
          raw,
        };
      }),
    [dataList, valueKey],
  );

  const fuse = useMemo(
    () => new Fuse(selectData, { keys: ["label"], threshold: 0.3 }),
    [selectData],
  );

  const handleFilter = ({
    search,
    options,
  }: {
    search: string;
    options: any[];
  }) => (search ? fuse.search(search).map((r) => r.item) : options);

  return (
    <Controller
      name={pickerName}
      control={control}
      render={({ field, fieldState }) => (
        <Select
          {...field}
          label={label}
          placeholder={placeholder}
          data={selectData}
          value={value ? String(value) : null}
          disabled={disabled}
          searchable
          clearable
          radius="sm"
          nothingFoundMessage="No results found"
          filter={handleFilter}
          onChange={(val) => {
            if (!val) return onClear();
            const matched = selectData.find((d) => d.value === val);
            if (matched) onSelect(matched.raw);
          }}
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
  );
};

export default AddressPicker;
