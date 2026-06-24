import type { Submission } from "@/types/data/submission.type";
import ListPending from "../list-pending";
import { Center, Stack } from "@mantine/core";
import { useEffect, useState, type RefObject } from "react";
import SubmissionListItem from "./submission-list-item";
import ViewSubmissionModal from "./view-submission-modal";
import { useSearchParams } from "react-router";

const SubmissionList = ({
  data,
  pending,
  ref,
}: {
  data: Submission[];
  pending: boolean;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  const [searchParams] = useSearchParams();
  const [openedSubmission, setOpenedSubmission] = useState<
    string | number | null
  >(null);

  const openSubmission = (id: number | string) => setOpenedSubmission(id);
  const closeSubmission = () => setOpenedSubmission(null);

  useEffect(() => {
    const subId = searchParams.get("sub");
    if (subId) {
      openSubmission(subId);
    }
  }, [searchParams]);

  return data.length > 0 ? (
    <>
      <ListPending pending={pending}>
        <Stack ref={ref} style={{ scrollMarginTop: "120px" }} pt={20}>
          {data.map((submission: Submission) => (
            <SubmissionListItem
              openSubmission={() => openSubmission(submission.id)}
              submission={submission}
              key={submission.id}
            />
          ))}
        </Stack>
      </ListPending>

      <ViewSubmissionModal
        opened={!!openedSubmission}
        onClose={closeSubmission}
        submissionId={openedSubmission}
      />
    </>
  ) : (
    <Center py={80}>No submissions found.</Center>
  );
};

export default SubmissionList;
