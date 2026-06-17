import type { Submission } from "@/types/data/submission.type";
import ListPending from "../list-pending";
import { Center, Stack } from "@mantine/core";
import type { RefObject } from "react";
import SubmissionListItem from "./submission-list-item";

const SubmissionList = ({
  data,
  pending,
  ref,
}: {
  data: Submission[];
  pending: boolean;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  return data.length > 0 ? (
    <ListPending pending={pending}>
      <Stack ref={ref} style={{ scrollMarginTop: "120px" }} pt={20}>
        {data.map((submission: Submission) => (
          <SubmissionListItem submission={submission} key={submission.id} />
        ))}
      </Stack>
    </ListPending>
  ) : (
    <Center py={80}>No submissions found.</Center>
  );
};

export default SubmissionList;
