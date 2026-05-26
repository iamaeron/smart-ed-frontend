export type AcademicYear = {
  year_id: number;
  start_date: string;
  end_date: string;
  academic_year: string;
  status: AcademicYearStatus;
  date_added: string;
};

export type AcademicYearStatus = "archived" | "upcoming" | "active" | "default";
