import { Button, Flex, Paper, Stack, Text } from "@mantine/core";
import type { Icon } from "@solar-icons/react/lib/types";

type ConfirmPopupProps = {
  title: string;
  description: string;
  type: "warning" | "info";
  onConfirm?: () => Promise<void> | null;
  onClose?: () => void;
  confirmText?: string;
  PopupIcon?: Icon;
  formId?: string;
};

const ConfirmPopupUI = ({
  title,
  description,
  type,
  onConfirm,
  onClose,
  confirmText,
  PopupIcon,
  formId,
}: ConfirmPopupProps) => {
  const theme = type === "warning" ? "subRed" : "primary";

  return (
    <>
      <Paper p={6}>
        <Stack align="center" gap={10}>
          {PopupIcon && (
            <div>
              <PopupIcon
                color={type === "info" ? "#2c68ff" : "#DB3237"}
                size={44}
              />
            </div>
          )}
          <Text size="xl" fw={700}>
            {title}
          </Text>
          <Text size="sm" ta="center">
            <span style={{ fontWeight: 600 }}>Warning:</span> {description}
          </Text>
        </Stack>
        <Flex mt={20} gap={8}>
          <Button
            onClick={onClose}
            tt="uppercase"
            variant="outline"
            type="button"
            color={theme}
            c={theme}
            fullWidth
          >
            Cancel
          </Button>
          <Button
            type={onConfirm ? "button" : "submit"}
            onClick={onConfirm ? onConfirm : undefined}
            form={formId ?? undefined}
            tt="uppercase"
            color={theme}
            fullWidth
          >
            {confirmText || "Confirm"}
          </Button>
        </Flex>
      </Paper>
    </>
  );
};

export default ConfirmPopupUI;
