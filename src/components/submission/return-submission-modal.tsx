import { Button, Modal, Textarea } from "@mantine/core";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import ConfirmPopupUI from "@/components/confirm-popup-ui";
import { useDisclosure } from "@mantine/hooks";
import type { Submission } from "@/types/data/submission.type";
import { useState } from "react";

const ReturnSubmissionModal = ({ submission }: { submission: Submission }) => {
  const [opened, { close, open }] = useDisclosure();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");

  const handleReturnSubmission = async () => {
    try {
      const res = await api.post(`/api/submissions/${submission.id}/return`, {
        comment,
      });
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["submissions", {}] });
        queryClient.invalidateQueries({
          queryKey: ["submission", submission.id, {}],
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
          title="Reason for Return"
          description="A comment is required to continue. This message will be sent to the submitting school."
          confirmText="Return"
          onConfirm={handleReturnSubmission}
          onClose={close}
          bodyInput={() => {
            return (
              <Textarea
                rows={3}
                placeholder="Enter reason for return ..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            );
          }}
          type="warning"
        />
      </Modal>

      <Button
        type="button"
        onClick={open}
        tt="uppercase"
        color="subRed"
        fullWidth
      >
        Return
      </Button>
    </>
  );
};

export default ReturnSubmissionModal;
