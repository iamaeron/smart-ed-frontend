import { Select, Skeleton } from "@mantine/core";
import selectClasses from "@/css/select.module.css";
import { AltArrowDown } from "@solar-icons/react";
import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import { useState } from "react";
import { pluckPath } from "@/lib/pluck-path";
import type { AcademicYear } from "@/types/data/academic-year.type";

const AcademicYearPicker = ({
  callbackFn,
  theme = "light",
}: {
  callbackFn?: () => void;
  theme?: "light" | "default";
}) => {
  const { data, isPending } = useFetchAcademicYears();
  const [value, setValue] = useState<string | null>(null);

  if (isPending) return <Skeleton h={36} w={150} radius="sm" />;

  const filterList = pluckPath(data.results.data, "academic_year");

  return (
    <Select
      rightSection={
        <AltArrowDown color={theme === "light" ? "#ffffff" : "#868e96"} />
      }
      placeholder="Pick value"
      data={filterList}
      defaultValue={
        data.results.data.filter((v: AcademicYear) => v.status === "default")[0]
          .academic_year ?? ""
      }
      onChange={(val) => {
        setValue(val);
        callbackFn ? callbackFn() : null;
      }}
      allowDeselect={false}
      className="school-year-select"
      comboboxProps={{ shadow: "xl" }}
      styles={
        theme === "light"
          ? {
              input: {
                background: "rgba(255,255,255,0.3)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
              },
              dropdown: {
                background: "rgba(255,255,255,0.2)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.5)",
                backdropFilter: "blur(14px)",
              },
            }
          : {
              input: {
                background: "#EAEAFF",
                border: "#EAEAFF",
              },
            }
      }
      classNames={
        theme === "light"
          ? {
              option: selectClasses.option,
            }
          : {}
      }
    />
  );
};

export default AcademicYearPicker;
