import { Route, Routes } from "react-router";
import SignInPage from "./landing";
import SystemAdminDashboard from "./system/dashboard";
import ProtectedRoutes from "@/layouts/protected-routes";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

      {/* System Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/system-admin/dashboard"
          element={<SystemAdminDashboard />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
