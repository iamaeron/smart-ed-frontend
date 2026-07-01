import { Flex, Text } from "@mantine/core";

const ErrorMessage = ({
  error,
  atEnd = true,
}: {
  error: string | undefined;
  atEnd?: boolean;
}) => {
  return (
    error && (
      <Flex justify={atEnd ? "flex-end" : "flex-start"}>
        <Text mt={6} fz={12} fw={500} c="subRed">
          {error ? error : "E"}
        </Text>
      </Flex>
    )
  );
};

export default ErrorMessage;
