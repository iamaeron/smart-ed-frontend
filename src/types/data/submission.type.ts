export type Submission = {
  id: number;
  submission_number: any;
  type: string;
  status: "pending" | "approved" | "returned";
  date_submitted: string;
  comments_count: number;
  submitted_by: string;
  school: {
    school_name: string;
    type: string;
    school_code: string;
  };
  details: SubmissionDetails;
};

export type SubmissionDetails = {
  name: any;
  code: any;
  year_established: any;
  school_type: string;
  address: any;
  district: any;
  latitude: any;
  longitude: any;
  image: any;
  school_head: string;
  principal_level: string;
  principal_contact: string;
  principal_email: string;
};
