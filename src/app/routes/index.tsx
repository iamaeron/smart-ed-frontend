import { Route, Routes } from "react-router";
import SignInPage from "./landing";
import SystemAdminDashboard from "./system/dashboard";
import ProtectedRoutes from "@/layouts/protected-routes";
import SystemAdminDivisionOverview from "./system/division-overview";
import SystemAdminSchoolsDirectory from "./system/schools-directory";
import SystemAdminNews from "./system/news-alert";
import SystemAdminSubmissions from "./system/submissions";
import SystemAdminSystemManagement from "./system/system-management";
import SchoolAdminDashboard from "./school/dashboard";
import DivisionAdminDashboard from "./division/dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

      {/* School Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/school-admin/dashboard"
          element={<SchoolAdminDashboard />}
        />
      </Route>

      {/* System Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/system-admin/dashboard"
          element={<SystemAdminDashboard />}
        />
        <Route
          path="/system-admin/division-overview"
          element={<SystemAdminDivisionOverview />}
        />
        <Route
          path="/system-admin/schools-directory"
          element={<SystemAdminSchoolsDirectory />}
        />
        <Route path="/system-admin/news" element={<SystemAdminNews />} />
        <Route
          path="/system-admin/submissions"
          element={<SystemAdminSubmissions />}
        />
        <Route
          path="/system-admin/system-management"
          element={<SystemAdminSystemManagement />}
        />
      </Route>

      {/* Division Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/division-admin/dashboard"
          element={<DivisionAdminDashboard />}
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
