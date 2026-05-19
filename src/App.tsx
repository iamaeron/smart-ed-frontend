import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import { theme } from "./theme";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <AppRoutes />
    </MantineProvider>
  );
};

export default App;
