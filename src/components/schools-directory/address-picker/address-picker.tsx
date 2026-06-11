import { useMemo } from "react";
import { Select } from "@mantine/core";
import Fuse from "fuse.js";

interface AddressPickerProps {
  label?: string;
  placeholder: string;
  value: string | number; // Changed to accept IDs (string or number)
  dataList: any[];
  disabled?: boolean;
  valueKey: string; // e.g., 'prov_code', 'mun_code', or 'id'
  onSelect: (item: any) => void;
  onClear: () => void;
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
}: AddressPickerProps) => {
  // 1. Format the dynamic data list into Mantine's expected layout
  const selectData = useMemo(() => {
    return dataList.map((item) => {
      const rawItem = item.item ? item.item : item;
      return {
        // Use the specific code/ID as the underlying unique value
        value: String(rawItem[valueKey]),
        label: rawItem.name.toLowerCase(),
        raw: rawItem,
      };
    });
  }, [dataList, valueKey]);

  // 2. Initialize Fuse on the dynamically narrowed data list
  const fuse = useMemo(() => {
    return new Fuse(selectData, { keys: ["label"], threshold: 0.3 });
  }, [selectData]);

  // 3. Custom filter function combining Mantine's typing engine with Fuse.js
  const handleSelectFilter = ({
    search,
    options,
  }: {
    search: string;
    options: any[];
  }) => {
    if (!search) return options;
    return fuse.search(search).map((res) => res.item);
  };

  return (
    <Select
      label={label}
      placeholder={placeholder}
      data={selectData}
      // Ensure 0 or empty values are treated as null so placeholder shows up
      value={value ? String(value) : null}
      disabled={disabled}
      searchable
      clearable
      nothingFoundMessage="No results found"
      filter={handleSelectFilter}
      onChange={(val) => {
        if (!val) {
          onClear();
          return;
        }
        const matched = selectData.find((d) => d.value === val);
        if (matched) onSelect(matched.raw);
      }}
      styles={{
        input: { textTransform: "capitalize" },
        option: { textTransform: "capitalize" },
      }}
      className="w-full"
    />
  );
};

export default AddressPicker;
