import { useContext, createContext, useEffect } from "react";
import { authStore } from "@/stores/auth.store";
import { type StoreApi, useStore } from "zustand";
import { api } from "@/lib/api";
import { Navigate, useLocation } from "react-router";
import Loader from "@/components/loader";

type AuthState = ReturnType<typeof authStore.getState>;

const AuthContext = createContext<StoreApi<AuthState> | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const user = useStore(authStore, (state) => state.user);
  const isLoading = useStore(authStore, (state) => state.isLoading);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const response = await api.get("/api/user-submissions");

        const user = {
          ...response.data.results?.user,
          submission_data: response.data.results?.submission_data,
        };

        authStore.getState().setUser(user || response.data.data);
      } catch (error) {
        authStore.getState().setUser(null);
      } finally {
        authStore.getState().setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (location.pathname === "/") {
    return children;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (
    (location.pathname.includes("system-admin") ||
      location.pathname.includes("school-account") ||
      location.pathname.includes("division-admin")) &&
    !user
  ) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return (
    <AuthContext.Provider value={authStore}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthStore = <T,>(selector: (state: AuthState) => T) => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error("AuthStore must be used within AuthContextProvider");
  }
  return useStore(store, selector);
};

export const useAuth = () => {
  const store = useContext(AuthContext);
  if (!store) {
    throw new Error("AuthStore must be used within AuthContextProvider");
  }
  return useStore(store);
};
