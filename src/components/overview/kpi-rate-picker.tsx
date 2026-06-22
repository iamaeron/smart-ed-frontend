import { Select } from "@mantine/core";
import { AltArrowDown } from "@solar-icons/react";
import { useState } from "react";

const KPIRatePicker = ({ callbackFn }: { callbackFn?: (v: any) => void }) => {
  const kpiRates = [
    "Gross Enrollment Rate",
    "Net Enrollment Rate",
    "Transition Rate",
    "Retention Rate",
    "Completion Rate",
    "Promotion Rate",
    "School Leaver Rate",
  ];

  const [value, setValue] = useState<string | null>("Gross Enrollment Rate");

  return (
    <Select
      placeholder="School Type"
      allowDeselect={false}
      value={value}
      onChange={(v) => {
        setValue(v);
        callbackFn ? callbackFn(v) : undefined;
      }}
      rightSection={<AltArrowDown size={16} />}
      data={kpiRates}
    />
  );
};

export default KPIRatePicker;
