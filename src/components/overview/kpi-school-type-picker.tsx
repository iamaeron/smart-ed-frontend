import { Select } from "@mantine/core";
import { AltArrowDown } from "@solar-icons/react";
import { useState } from "react";

const KPISchoolTypePicker = ({
  data,
  callbackFn,
}: {
  data: Record<any, any>[];
  callbackFn?: (v: any) => void;
}) => {
  const [value, setValue] = useState(data[0].name);

  const schoolTypeList = data.map((item: any) => item.name) || [];

  return (
    <Select
      placeholder="School Type"
      allowDeselect={false}
      defaultValue={value}
      onChange={(v) => {
        setValue(v);
        callbackFn ? callbackFn(v) : undefined;
      }}
      rightSection={<AltArrowDown size={16} />}
      data={schoolTypeList ?? []}
    />
  );
};

export default KPISchoolTypePicker;
