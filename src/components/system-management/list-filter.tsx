import { Select } from "@mantine/core";
import { AltArrowDown } from "@solar-icons/react";
import { Filter } from "lucide-react";
import { useState } from "react";

type ListFilterType = {
  data: { [k: string]: any }[];
  all: string;
  accessor: string;
  callbackFn?: (v: any) => void;
};

function pluckPath(arr: { [k: string]: any }[], path: string) {
  return arr
    .map((item) => {
      if (item === null || item === undefined || item[path] === null)
        return null;
      return path.split(".").reduce((acc: any, key) => {
        if (acc[key] === null || acc[key] === undefined) return null;

        return acc[key];
      }, item);
    })
    .filter((v) => v !== null);
}

const ListFilter = ({ data, all, accessor, callbackFn }: ListFilterType) => {
  const filterList = pluckPath(data, accessor);
  const [selectedValue, setSelectedValue] = useState(all ?? "");

  const handleChange = (v: any) => {
    setSelectedValue(v);
    callbackFn ? callbackFn(v) : null;
  };

  return (
    <Select
      placeholder="Pick value"
      variant="filled"
      allowDeselect={false}
      defaultValue={all}
      clearable={false}
      leftSection={<Filter size={16} />}
      value={selectedValue}
      onChange={handleChange}
      rightSection={<AltArrowDown size={16} />}
      data={Array.from(new Set([all, ...filterList]))}
      comboboxProps={{
        shadow: "xl",
      }}
      styles={{
        input: {
          backgroundColor: "#F3F5FF",
        },
      }}
    />
  );
};

export default ListFilter;
