import { TextInput } from "@mantine/core";
import { Magnifier } from "@solar-icons/react";
import { useEffect, useState } from "react";

const TabSearchBar = ({
  callbackFn,
  placeholder,
}: {
  callbackFn?: (v: string) => void;
  placeholder?: string;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      callbackFn ? callbackFn(value) : null;
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return (
    <TextInput
      variant="filled"
      placeholder={placeholder ? placeholder : "Search ..."}
      styles={{
        input: {
          backgroundColor: "#F3F5FF",
        },
      }}
      value={value}
      onChange={handleChange}
      leftSection={<Magnifier size={16} />}
    />
  );
};

export default TabSearchBar;
