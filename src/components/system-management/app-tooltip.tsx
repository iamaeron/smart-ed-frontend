import { Tooltip, type TooltipProps } from "@mantine/core";

const createPopTransition = (position: string) => {
  let shiftX = "0px";
  let shiftY = "0px";

  if (position.includes("top")) shiftY = "-4px";
  if (position.includes("bottom")) shiftY = "4px";
  if (position.includes("left")) shiftX = "-4px";
  if (position.includes("right")) shiftX = "4px";

  return {
    in: { opacity: 1, transform: "scale(1) translate(0px, 0px)" },
    out: {
      opacity: 0,
      transform: `scale(0.97) translate(${shiftX}, ${shiftY})`,
    },
    transitionProperty: "transform, opacity",
  };
};

const AppTooltip = ({ ...props }: TooltipProps) => {
  const defaultPosition = "top";

  return (
    <Tooltip
      {...props}
      fw={500}
      transitionProps={{
        transition: createPopTransition(defaultPosition),
        duration: 150,
        timingFunction: "ease-out",
      }}
      style={{
        fontSize: "12px",
      }}
      styles={{
        tooltip: {
          boxShadow:
            "0 2px 4px rgba(0, 0, 0, 0.1), 0 4px 12px rgba(0, 0, 0, 0.1), 0 10px 24px rgba(0, 0, 0, 0.1)",
        },
      }}
      // color="rgba(17, 16, 23, 0.7)"
      color="#27272a"
    />
  );
};

export default AppTooltip;
