import SystemAdminDashboard from "@/app/routes/system/dashboard";
import SystemAdminDivisionOverview from "@/app/routes/system/division-overview";
import SystemAdminNews from "@/app/routes/system/news-alert";
import SystemAdminSchoolsDirectory from "@/app/routes/system/schools-directory";
import SystemAdminSubmissions from "@/app/routes/system/submissions";
import SystemAdminSystemManagement from "@/app/routes/system/system-management";
import {
  Bell,
  Chart,
  FileCheck,
  SquareAcademicCap,
  UsersGroupRounded,
  Widget,
} from "@solar-icons/react";

export const schoolAdminNavLinks = [
  {
    label: "Dashboard",
    to: "/school-admin/dashboard",
    icon: Widget,
  },
  {
    label: "School Overview",
    to: "/school-admin/school-overview",
    icon: Chart,
  },
  {
    label: "Submissions",
    to: "/school-admin/submissions",
    icon: SquareAcademicCap,
  },
  {
    label: "News & Alert",
    to: "/school-admin/news",
    icon: Bell,
  },
];

export const systemAdminNavLinks = [
  {
    label: "Dashboard",
    to: "/system-admin/dashboard",
    icon: Widget,
  },
  {
    label: "Division Overview",
    to: "/system-admin/division-overview",
    icon: Chart,
  },
  {
    label: "Schools Directory",
    to: "/system-admin/schools-directory",
    icon: SquareAcademicCap,
  },
  {
    label: "News & Alert",
    to: "/system-admin/news",
    icon: Bell,
    page: SystemAdminNews,
  },
  {
    label: "Submissions",
    to: "/system-admin/submissions",
    icon: FileCheck,
  },
  {
    label: "System Management",
    to: "/system-admin/system-management",
    icon: UsersGroupRounded,
  },
];

export const divisionAdminNavLinks = [
  {
    label: "Dashboard",
    to: "/division-admin/dashboard",
    icon: Widget,
  },
  {
    label: "Division Overview",
    to: "/division-admin/division-overview",
    icon: Chart,
  },
  {
    label: "Schools Directory",
    to: "/division-admin/schools-directory",
    icon: SquareAcademicCap,
  },
  {
    label: "News & Alert",
    to: "/division-admin/news",
    icon: Bell,
  },
  {
    label: "Submissions",
    to: "/division-admin/submissions",
    icon: FileCheck,
  },
];
