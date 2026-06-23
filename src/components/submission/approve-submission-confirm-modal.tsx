import { Button, Modal } from "@mantine/core";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { useDisclosure } from "@mantine/hooks";
import type { Submission } from "@/types/data/submission.type";

const ApproveSubmissionConfirmModal = ({
  submission,
}: {
  submission: Submission;
}) => {
  const queryClient = useQueryClient();
  const [opened, { close, open }] = useDisclosure();

  const handleApproveSubmission = async () => {
    try {
      const res = await api.put(`/api/submissions/${submission.id}/approve`);
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        toast(res.data.results.action);
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
          title="Approve Submission?"
          description="Approving this submission will make it publicly visible on the dashboard. Make sure all details are accurate."
          confirmText="Approve"
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
        Approve
      </Button>
    </>
  );
};

export default ApproveSubmissionConfirmModal;
