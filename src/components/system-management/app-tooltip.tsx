import { Tooltip, type TooltipProps } from "@mantine/core";

const AppTooltip = ({ ...props }: TooltipProps) => {
  return (
    <Tooltip
      {...props}
      style={{ fontSize: "13px" }}
      color="rgba(17, 16, 23, 0.7)"
    />
  );
};

export default AppTooltip;
