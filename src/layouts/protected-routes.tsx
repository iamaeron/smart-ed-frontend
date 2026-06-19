import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import { useFetchAcademicYears } from "@/lib/fetcher/academic-year.fetcher";
import { useAcademicYearStore } from "@/stores/academic-year.store";
import type { AcademicYear } from "@/types/data/academic-year.type";
import { useEffect } from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { isLoading, user } = useAuth();
  const { data, isPending } = useFetchAcademicYears({ withoutUA: true });
  const setAcademicYearId = useAcademicYearStore((state) => state.setYearId);
  const setAcademicYearLabel = useAcademicYearStore((state) => state.setLabel);

  const defaultAcademicYear = data?.results?.data?.filter(
    (v: AcademicYear) => v.status === "default",
  )[0];

  useEffect(() => {
    if (defaultAcademicYear) {
      setAcademicYearId(defaultAcademicYear.year_id);
      setAcademicYearLabel(defaultAcademicYear.academic_year);
    }
  }, [defaultAcademicYear, setAcademicYearId, setAcademicYearLabel]);

  if (isLoading || isPending) return <Loader />;

  if (!user) return <Navigate to="/" replace />;

  const userRoleToUrl = user?.role.toLowerCase().replace(" ", "-"); // System Admin -> system admin -> system-admin

  if (location.pathname.split("/")[1] !== userRoleToUrl) {
    return <Navigate to={`/${userRoleToUrl}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
