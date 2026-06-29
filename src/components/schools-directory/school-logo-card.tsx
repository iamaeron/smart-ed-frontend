import useImagePreview from "@/hooks/use-image-preview";
import { api } from "@/lib/api";
import {
  Box,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  Image,
  Paper,
  Text,
} from "@mantine/core";
import { UploadMinimalistic } from "@solar-icons/react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Pen, School, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const SchoolLogoCard = ({ school }: { school: { [k: string]: any } }) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { getRootProps, getInputProps, isDragActive, file, image, resetImage } =
    useImagePreview();

  const handleImageUpload = async () => {
    if (!file) return;

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await api.post(
        `/api/schools/${school.id}/upload-image`,
        formData,
      );

      if (res.data.code === 200) {
        queryClient.invalidateQueries({
          queryKey: ["school", String(school.id)],
        });
        toast(res.data.message);
        resetImage();
        setIsEditing(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      w="100%"
      bg="white"
      // withBorder
      p="lg"
      c="mainText"
      radius="lg"
      // bd="1px solid rgba(0,0,0,0.1)"
      shadow="xl"
    >
      <Text fw={600} fz={18} mb={10}>
        School Logo
      </Text>

      {isEditing ? (
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
                id: "logo-picker",
              })}
            />
            {image ? (
              <Image src={image} h={170} w={170} radius="md" />
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
                    htmlFor="logo-picker"
                    variant="white"
                    color="dark"
                    leftSection={<UploadMinimalistic size={16} />}
                  >
                    Upload
                  </Button>
                </Paper>
                <Divider w="100%" my="xs" label="Or" labelPosition="center" />
                <Text fz={14} c="longText">
                  Drag an image file here
                </Text>
              </Flex>
            )}
          </Center>
        </Card>
      ) : (
        <Center h={230} style={{ flexDirection: "column" }}>
          <Box w={170} h={170}>
            {school.image ? (
              <Image
                src={school.image}
                width="100%"
                height="100%"
                radius="md"
                loading="lazy"
                decoding="async"
              />
            ) : (
              <Paper h="100%" w="100%" shadow="none" bg="blue.0" radius="md">
                <Center h="100%" w="100%" c="blue.9">
                  <School strokeWidth={1.5} size={80} />
                </Center>
              </Paper>
            )}
          </Box>
        </Center>
      )}
      <Center>
        <Button
          onClick={() => {
            setIsEditing(!isEditing);

            if (image) resetImage();
          }}
          variant="outline"
          color={isEditing ? "dark" : "primary"}
          mt={20}
          leftSection={isEditing ? <X size={16} /> : <Pen size={16} />}
        >
          {isEditing ? "Cancel" : "Change"}
        </Button>

        {isEditing ? (
          <Button
            onClick={handleImageUpload}
            variant="filled"
            color={"primary"}
            ml={10}
            loading={isLoading}
            disabled={!image}
            mt={20}
            leftSection={<Check size={16} />}
          >
            Save
          </Button>
        ) : null}
      </Center>
    </Card>
  );
};

export default SchoolLogoCard;
