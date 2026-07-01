import { Buildings, SquareAcademicCap, UserHandUp } from "@solar-icons/react";
import QuickViewContainer from "./quick-view-container";
import QuickViewCol from "./quick-view-col";
import { useFetchDashboardResources } from "@/lib/fetcher/resource.fetcher";
import { Card } from "@mantine/core";
import { useAuth } from "@/contexts/auth.context";
import { useAcademicYearStore } from "@/stores/academic-year.store";

const QuickOverviewCols = () => {
  const { user } = useAuth();
  const year = useAcademicYearStore((state) => state.yearLabel);
  const { data: data, isPending } = useFetchDashboardResources();
  console.log(data);

  const totalArr = data?.results?.data || [];
  const currentYearData =
    totalArr.length > 0 ? totalArr.find((i: any) => i.year === year) : {};

  const isSchoolAccount = user?.role === "School Account";

  return (
    <QuickViewContainer>
      {isPending || isPending ? (
        [1, 2, 3].map((skelly) => (
          <Card
            key={skelly}
            h={134}
            w="100%"
            radius="lg"
            bg="rgba(255,255,255,0.3)"
          />
        ))
      ) : (
        <>
          <QuickViewCol
            icon={Buildings}
            label={isSchoolAccount ? "Total Classrooms" : "Total Schools"}
            value={
              isSchoolAccount
                ? currentYearData.classrooms
                : currentYearData.total_schools
            }
          />
          <QuickViewCol
            icon={SquareAcademicCap}
            label="Total Learners"
            value={currentYearData.total_students}
          />
          <QuickViewCol
            icon={UserHandUp}
            label="Total Teachers"
            value={currentYearData.teachers}
          />
        </>
      )}
    </QuickViewContainer>
  );
};

export default QuickOverviewCols;
