import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";

import { MantineProvider } from "@mantine/core";
import AppRoutes from "./routes";
import { theme } from "@/lib/theme";
import AuthContextProvider from "@/contexts/auth.context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ScrollToTop from "@/components/scroll-to-top";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <AuthContextProvider>
        <QueryClientProvider client={queryClient}>
          <Toaster closeButton />
          <ScrollToTop />
          <AppRoutes />
        </QueryClientProvider>
      </AuthContextProvider>
    </MantineProvider>
  );
};

export default App;
