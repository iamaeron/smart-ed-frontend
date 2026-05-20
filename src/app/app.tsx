import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import { theme } from "@/lib/theme";
import AuthContextProvider from "@/contexts/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <AppRoutes />
        </QueryClientProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
};

export default App;
