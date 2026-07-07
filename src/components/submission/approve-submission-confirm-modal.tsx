import { Button, Modal } from "@mantine/core";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { useDisclosure } from "@mantine/hooks";
import type { Submission } from "@/types/data/submission.type";

const ApproveSubmissionConfirmModal = ({
  submission,
  requestEdit,
}: {
  submission: Submission;
  requestEdit: boolean;
}) => {
  const queryClient = useQueryClient();
  const [opened, { close, open }] = useDisclosure();

  const handleApproveSubmission = async () => {
    try {
      const reqApi = requestEdit
        ? `/api/submissions/${submission.id}/approve-request`
        : `/api/submissions/${submission.id}/approve`;

      const res = await api.post(reqApi);
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        queryClient.invalidateQueries({
          queryKey: ["submission", String(submission.id), {}],
        });
        toast(res.data.message);
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="md"
        centered
      >
        <ConfirmPopupUI
          title={requestEdit ? "Grant Permission?" : "Approve Submission?"}
          description={
            requestEdit
              ? "This will unlock the submission and notify the user. Once they make their changes, they will need to resubmit the data for your approval."
              : "Approving this submission will make it publicly visible on the dashboard. Make sure all details are accurate."
          }
          confirmText={requestEdit ? "Grant" : "Approve"}
          onConfirm={handleApproveSubmission}
          onClose={close}
          type="warning"
        />
      </Modal>

      <Button
        type="button"
        onClick={open}
        tt="uppercase"
        color="subGreen"
        fullWidth
      >
        {requestEdit ? "Grant Permission" : `Approve`}
      </Button>
    </>
  );
};

export default ApproveSubmissionConfirmModal;
