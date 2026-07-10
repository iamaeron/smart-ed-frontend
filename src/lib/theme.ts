import { createTheme, type MantineColorsTuple } from "@mantine/core";

// Helper to fill a Mantine 10-shade array with a single color
// This satisfies Mantine's internal type requirements safely
const singleColor = (hex: string): MantineColorsTuple =>
  Array(10).fill(hex) as unknown as MantineColorsTuple;

export const theme = createTheme({
  colors: {
    mainText: singleColor("#111111"),
    longText: singleColor("#555555"),
    grey: singleColor("#555555"),
    whBg: singleColor("#ffffff"),
    lightBackground: singleColor("#f3f5ff"),
    accent2: singleColor("#cfddff"),
    border: singleColor("#EAEAFF"),
    accent1: singleColor("#ff9500"),
    primary: singleColor("#2c68ff"),
    primary2: singleColor("#192D7C"),

    // Submissions group
    subRed: singleColor("#DB3237"),
    subGreen: singleColor("#3cbb54"),
    subYellow: singleColor("#f4c10d"),
  },

  primaryColor: "primary",
  defaultRadius: "md",
});
