import { Tooltip, type TooltipProps } from "@mantine/core";

const AppTooltip = ({ ...props }: TooltipProps) => {
  return (
    <Tooltip
      {...props}
      fw={500}
      style={{ fontSize: "12px" }}
      color="rgba(17, 16, 23, 0.75)"
    />
  );
};

export default AppTooltip;
