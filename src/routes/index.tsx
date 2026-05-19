import { Route, Routes } from "react-router";
import SignInPage from "./landing";
import SystemAdminDashboard from "./system-admin/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

      {/* System Admin Routes */}
      <Route
        path="/system-admin/dashboard"
        element={<SystemAdminDashboard />}
      />
    </Routes>
  );
};

export default AppRoutes;
