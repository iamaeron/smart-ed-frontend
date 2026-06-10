import { zodResolver } from "@hookform/resolvers/zod";
import {
  Box,
  ActionIcon,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Text,
  TextInput,
  Textarea,
  Center,
  Image,
  Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, X } from "lucide-react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import ErrorMessage from "@/components/form/error-message";
import { toast } from "sonner";
import { api } from "@/lib/api";
import {
  announcementSchema,
  type AnnouncementData,
} from "@/types/form/announcement.schema";
import useImagePreview from "@/hooks/use-image-preview";
import { UploadMinimalistic } from "@solar-icons/react";
import AddAnnouncementConfirmModal from "./add-announcement-confirm-modal";

const AddAnnouncementModal = ({
  type = "public",
}: {
  type?: "public" | "dashboard";
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);

  const { getRootProps, getInputProps, isDragActive, file, image, resetImage } =
    useImagePreview();

  const { control, handleSubmit, formState, setError, reset } =
    useForm<AnnouncementData>({
      resolver: zodResolver(announcementSchema),
      defaultValues: {
        title: "",
        description: "",
        image: undefined,
        type,
      },
    });

  const onSubmit: SubmitHandler<AnnouncementData> = async (data) => {
    const payload = new FormData();

    if (type === "public") {
      if (!file) return;
      payload.append("image", file);
    }

    payload.append("title", data.title);
    payload.append("description", data.description);
    payload.append("type", data.type);

    try {
      const res = await api.post(`/api/announcements`, payload);

      if (res.data.code === 200) {
        toast.success(res.data.message);
        queryClient.invalidateQueries({
          queryKey: ["announcements", {}],
        });
        resetImage();
        reset();
        close();
      }
    } catch (err: any) {
      setError("form", { message: err.response.data.message });
    }
  };

  return (
    <>
      <Modal
        withCloseButton={false}
        opened={opened}
        onClose={close}
        size="lg"
        centered
        padding={0}
      >
        <Card py="md" style={{ borderBottom: "1px solid #EAEAFF" }} px="lg">
          <Group justify="space-between">
            <Text size="lg" fw={600}>
              Add Announcement
            </Text>

            <ActionIcon
              onClick={close}
              variant="subtle"
              color="gray"
              type="button"
            >
              <X size={18} />
            </ActionIcon>
          </Group>
        </Card>

        <form id="new-announcement-form" onSubmit={handleSubmit(onSubmit)}>
          <Paper p="lg">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Box>
                  <TextInput
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.title?.message ? "subRed" : "dark",
                    }}
                    placeholder="Write something ..."
                    label="Announcement Title"
                    radius="sm"
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.title?.message}
                  />
                </Box>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Box my={16}>
                  <Textarea
                    {...field}
                    labelProps={{
                      mb: 6,
                      fw: 400,
                      c: formState.errors.description?.message
                        ? "subRed"
                        : "dark",
                    }}
                    placeholder="Write something ..."
                    label="Description"
                    radius="sm"
                    rows={8}
                  />
                  <ErrorMessage
                    atEnd={false}
                    error={formState.errors.description?.message}
                  />
                </Box>
              )}
            />

            {type === "public" ? (
              <>
                <Divider mb={12} />

                <Text fw={600} fz={14} mb={4}>
                  Add Media
                </Text>
                <Card
                  bg="gray.1"
                  h={230}
                  shadow="none"
                  className={["drop-box", isDragActive && "dragging"].join(" ")}
                  {...getRootProps()}
                >
                  <Center h="100%">
                    <input
                      {...getInputProps({
                        style: { display: "none" },
                        id: "image-picker",
                      })}
                    />
                    {image ? (
                      <Image
                        src={image}
                        h={"95%"}
                        w={"95%"}
                        fit="contain"
                        radius="md"
                      />
                    ) : (
                      <Flex direction={"column"} align={"center"}>
                        <Paper
                          bg="transparent"
                          shadow="md"
                          h="max-content"
                          w="max-content"
                        >
                          <Button
                            component="label"
                            htmlFor="image-picker"
                            variant="white"
                            color="dark"
                            leftSection={<UploadMinimalistic size={16} />}
                          >
                            Upload
                          </Button>
                        </Paper>
                        <Divider
                          w="100%"
                          my="xs"
                          label="Or"
                          labelPosition="center"
                        />
                        <Text fz={14} c="longText">
                          Drag an image file here
                        </Text>
                      </Flex>
                    )}
                  </Center>
                </Card>
              </>
            ) : null}

            <Flex mt={30} gap={16}>
              <Button
                onClick={close}
                tt="uppercase"
                variant="outline"
                color="primary"
                c="primary"
                fullWidth
                type="button"
              >
                Cancel
              </Button>
              <AddAnnouncementConfirmModal />
            </Flex>
          </Paper>
        </form>
      </Modal>

      <Button onClick={open} leftSection={<Plus size={16} />}>
        New Announcement
      </Button>
    </>
  );
};

export default AddAnnouncementModal;
