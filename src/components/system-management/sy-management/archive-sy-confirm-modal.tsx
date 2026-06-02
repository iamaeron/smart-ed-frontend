import { Button, Flex, Modal, Paper, Stack, Text } from "@mantine/core";
import type { EditSYModalProps } from "./edit-sy-modal";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const ArchiveSYConfirmModal = ({ sy, onClose, opened }: EditSYModalProps) => {
  const queryClient = useQueryClient();

  const handleArchive = async () => {
    try {
      const res = await api.post(
        `/api/academic-years/${sy.year_id}/change-status`,
        { status: "archived" },
      );
      if (res.data.code === 200) {
        queryClient.invalidateQueries({ queryKey: ["academic_years", {}] });
        toast(res.data.message);
        onClose();
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
        onClose={onClose}
        size="md"
        centered
      >
        <Paper p={6}>
          <Stack align="center" gap={10}>
            <Text size="xl" fw={700}>
              Archive Year?
            </Text>
            <Text size="sm" ta="center">
              <span style={{ fontWeight: 600 }}>Warning:</span> This school year
              will be removed from dashboards and reports and will no longer be
              visible or editable.
            </Text>
          </Stack>
          <Flex mt={20} gap={8}>
            <Button
              onClick={onClose}
              tt="uppercase"
              variant="outline"
              type="button"
              color="subRed"
              c="subRed"
              fullWidth
            >
              Cancel
            </Button>
            <Button
              onClick={handleArchive}
              tt="uppercase"
              color="subRed"
              fullWidth
            >
              Archive
            </Button>
          </Flex>
        </Paper>
      </Modal>
    </>
  );
};

export default ArchiveSYConfirmModal;
