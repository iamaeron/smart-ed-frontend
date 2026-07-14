import { useAuth } from "@/contexts/auth.context";

export function findUserSubmission(type: string, status: string) {
  const { user } = useAuth();

  const foundData = user?.submission_data?.find(
    (f) => f.type === type && f.status === status,
  );

  return {
    foundData,
    hasData: foundData ? true : false,
  };
}
