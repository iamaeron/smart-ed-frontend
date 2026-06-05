import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

export default function useImagePreview() {
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const foundFile = acceptedFiles[0];
    if (!foundFile) return;

    setFile(foundFile);

    const localUrl = URL.createObjectURL(foundFile);
    setImage(localUrl);
  }, []);
  const dropzone = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
    },
    multiple: false,
  });

  const resetImage = () => {
    setImage(null);
    setFile(null);
  };

  return {
    ...dropzone,
    image,
    file,
    resetImage,
  };
}
