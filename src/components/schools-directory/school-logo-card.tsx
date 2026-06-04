import { Button, Card, Center, Image, Paper, Text } from "@mantine/core";
import { UploadMinimalistic } from "@solar-icons/react";
import { Pen, X } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const SchoolLogoCard = ({ school }: { school: { [k: string]: any } }) => {
  const [isEditing, setIsEditing] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    console.log(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          style={{ border: "2px dashed #EAEAFF" }}
          {...getRootProps()}
        >
          <Center h="100%">
            <Paper shadow="md" h="max-content" w="max-content">
              <input
                {...getInputProps({
                  style: { display: "none" },
                  id: "logo-picker",
                })}
              />
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
          </Center>
        </Card>
      ) : (
        <Center h={230} style={{ flexDirection: "column" }}>
          <Image
            src={school.image ?? "/spcf-logo.png"}
            h={170}
            w={170}
            radius="md"
            loading="lazy"
            decoding="async"
          />
        </Center>
      )}
      <Center>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          variant="outline"
          color={isEditing ? "dark" : "primary"}
          mt={20}
          leftSection={isEditing ? <X size={16} /> : <Pen size={16} />}
        >
          {isEditing ? "Cancel" : "Change"}
        </Button>
      </Center>
    </Card>
  );
};

export default SchoolLogoCard;
