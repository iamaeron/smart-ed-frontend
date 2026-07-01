import { Route, Routes } from "react-router";
import SignInPage from "./signin";
import SystemAdminDashboard from "./system/dashboard";
import ProtectedRoutes from "@/layouts/protected-routes";
import SystemAdminDivisionOverview from "./system/division-overview";
import SystemAdminSchoolsDirectory from "./system/schools-directory";
import SystemAdminNews from "./system/news-alert";
import SystemAdminSubmissions from "./system/submissions";
import SystemAdminSystemManagement from "./system/system-management";
import SchoolAdminDashboard from "./school/dashboard";
import DivisionAdminDashboard from "./division/dashboard";
import SystemAdminSchoolDirectory from "./system/schools-directory/id";
import DivisionAdminDivisionOverview from "./division/division-overview";
import DivisionAdminSchoolsDirectory from "./division/schools-directory";
import DivisionAdminSchoolDirectory from "./division/schools-directory/id";
import DivisionAdminNews from "./division/news-alert";
import DivisionAdminSubmissions from "./division/submissions";
import SchoolAdminSchoolOverview from "./school/school-overview";
import SchoolAdminSubmissions from "./school/submissions";
import SchoolAdminNews from "./school/news-alert";
import NotFound from "./404";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignInPage />} />

      {/* School Admin Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route
          path="/school-account/dashboard"
          element={<SchoolAdminDashboard />}
        />

        <Route
          path="/school-account/school-overview"
          element={<SchoolAdminSchoolOverview />}
        />

        <Route
          path="/school-account/submissions"
          element={<SchoolAdminSubmissions />}
        />

        <Route path="/school-account/news" element={<SchoolAdminNews />} />
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
        <Route
          path="/system-admin/schools-directory/:id"
          element={<SystemAdminSchoolDirectory />}
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
        <Route
          path="/division-admin/division-overview"
          element={<DivisionAdminDivisionOverview />}
        />

        <Route
          path="/division-admin/schools-directory"
          element={<DivisionAdminSchoolsDirectory />}
        />
        <Route
          path="/division-admin/schools-directory/:id"
          element={<DivisionAdminSchoolDirectory />}
        />

        <Route path="/division-admin/news" element={<DivisionAdminNews />} />

        <Route
          path="/division-admin/submissions"
          element={<DivisionAdminSubmissions />}
        />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
