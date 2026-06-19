import { Select, Skeleton, type SelectProps } from "@mantine/core";
import selectClasses from "@/css/select.module.css";
import { AltArrowDown } from "@solar-icons/react";
import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import { useEffect, useState } from "react";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { useAcademicYearStore } from "@/stores/academic-year.store";

const AcademicYearPicker = ({
  callbackFn,
  theme = "light",
}: {
  callbackFn?: () => void;
  theme?: "light" | "default" | "outlined";
}) => {
  const setAcademicYearId = useAcademicYearStore((state) => state.setYearId);
  const setAcademicYearLabel = useAcademicYearStore((state) => state.setLabel);
  const { data, isPending } = useFetchAcademicYears({ withoutUA: true });
  const [_value, setValue] = useState<string | null>(null);

  const defaultAcademicYear = data?.results?.data?.filter(
    (v: AcademicYear) => v.status === "default",
  )[0];

  useEffect(() => {
    if (defaultAcademicYear) {
      setAcademicYearId(defaultAcademicYear.year_id);
      setAcademicYearLabel(defaultAcademicYear.academic_year);
    }
  }, [defaultAcademicYear, setAcademicYearId, setAcademicYearLabel]);

  if (isPending || !data) return <Skeleton h={36} w={150} radius="sm" />;

  const filterList = (data.results.data as AcademicYear[]).map((academic) => {
    return {
      value: academic.year_id,
      label: academic.academic_year,
    };
  });

  const selectProps: SelectProps = {
    data: filterList,
    onChange: (val) => {
      setAcademicYearId(val);
      const selectedItem = filterList.find((f) => f.value === val);
      setAcademicYearLabel(selectedItem?.label);

      setValue(val);
      callbackFn ? callbackFn() : null;
    },
    defaultValue: defaultAcademicYear.year_id ?? "",
    allowDeselect: false,
    comboboxProps: {
      shadow: "xl",
    },
  };

  return theme === "outlined" ? (
    <Select
      {...selectProps}
      placeholder="Pick value"
      rightSection={<AltArrowDown size={16} />}
    />
  ) : (
    <Select
      {...selectProps}
      rightSection={
        <AltArrowDown color={theme === "light" ? "#ffffff" : "#868e96"} />
      }
      placeholder="Pick value"
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
