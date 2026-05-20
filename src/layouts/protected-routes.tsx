import Loader from "@/components/loader";
import { useAuth } from "@/contexts/auth.context";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoutes = ({ allowedRoles }: { allowedRoles?: string[] }) => {
  const { isLoading, user } = useAuth();

  if (isLoading) return <Loader />;

  // If no session, redirect to login and save the attempted URL
  //   if (!session) {
  //     return <Navigate to="/" state={{ from: location }} replace />;
  //   }

  //   if (
  //     location.pathname.split("/")[1] == "creator" &&
  //     !allowedRoles?.includes(session.user.role)
  //   ) {
  //     return <Navigate to="/client/dashboard" replace />;
  //   }

  //   if (
  //     location.pathname.split("/")[1] == "client" &&
  //     !allowedRoles?.includes(session.user.role)
  //   ) {
  //     return <Navigate to="/creator/dashboard" replace />;
  //   }

  return <Outlet />;
};

export default ProtectedRoutes;
