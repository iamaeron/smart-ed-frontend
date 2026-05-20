import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import { theme } from "@/lib/theme";
import AuthContextProvider from "@/contexts/auth.context";

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </MantineProvider>
  );
};

export default App;
