import { useMemo } from "react";

export default function useTransformChartData(data: Record<any, any>[] | null) {
  const transformedData = useMemo(() => {
    if (!data) return [];

    const allTransformedItems = [] as any;

    data.map((obj: any) => {
      const object = obj.levels;

      const initialRow = { academic_year: obj.academic_year };

      const completedRow = object.reduce(
        (accumulator: any, currentGrade: any) => {
          return {
            ...accumulator,
            [currentGrade.grade_level]: currentGrade.total_students,
          };
        },
        initialRow,
      );

      allTransformedItems.push(completedRow);
    });

    return allTransformedItems.sort((a: any, b: any) => {
      return a.academic_year.localeCompare(b.academic_year);
    });
  }, [data]);

  return transformedData;
}
