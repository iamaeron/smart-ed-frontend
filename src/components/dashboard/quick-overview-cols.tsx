import { Buildings, SquareAcademicCap, UserHandUp } from "@solar-icons/react";
import QuickViewContainer from "./quick-view-container";
import QuickViewCol from "./quick-view-col";
import { useFetchResources } from "@/lib/fetcher/resource.fetcher";
import { Card } from "@mantine/core";
import { useAuth } from "@/contexts/auth.context";
import { useFetchEnrollmentData } from "@/lib/fetcher/enrollment.fetcher";

const QuickOverviewCols = () => {
  const { user } = useAuth();
  const { data, isPending } = useFetchResources();
  const { data: enrollmentData, isPending: isEnrollmentDataPending } =
    useFetchEnrollmentData();
  console.log(data);

  const totals = data?.results?.data?.totals_by_resource || [];
  const enrollmentTotal =
    enrollmentData?.results?.data?.enrollment_totals?.total_students || 0;

  const isSchoolAccount = user?.role === "School Account?";

  return (
    <QuickViewContainer>
      {isPending || isEnrollmentDataPending ? (
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
            label={isSchoolAccount ? "Total Schools" : "Total Classrooms"}
            value={totals[0].inventory}
          />
          <QuickViewCol
            icon={SquareAcademicCap}
            label="Total Learners"
            value={enrollmentTotal}
          />
          <QuickViewCol
            icon={UserHandUp}
            label="Total Teachers"
            value={totals[1].inventory}
          />
        </>
      )}
    </QuickViewContainer>
  );
};

export default QuickOverviewCols;
