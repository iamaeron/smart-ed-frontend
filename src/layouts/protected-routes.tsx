import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Loader />;

  if (!user) return <Navigate to="/" replace />;

  const userRoleToUrl = user?.role.toLowerCase().replace(" ", "-");

  if (location.pathname.split("/")[1] !== userRoleToUrl) {
    return <Navigate to={`/${userRoleToUrl}/dashboard`} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
