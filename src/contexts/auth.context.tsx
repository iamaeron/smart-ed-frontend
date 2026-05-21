import { useContext, createContext, useEffect, useState } from "react";
import { authStore } from "@/stores/auth.store";
import { type StoreApi, useStore } from "zustand";
import { api } from "@/lib/api";
import { Navigate, useLocation } from "react-router";

type AuthState = ReturnType<typeof authStore.getState>;

const AuthContext = createContext<StoreApi<AuthState> | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [hasSession, setHasSession] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("auth_token");

      if (!token) {
        setHasSession(false);
        authStore.getState().setUser(null);
        authStore.getState().setIsLoading(false);
        return;
      }

      try {
        const response = await api.get("/api/user");
        setHasSession(true);
        authStore.getState().setUser(response.data.data);
      } catch (error) {
        setHasSession(false);
        localStorage.removeItem("auth_token");
        authStore.getState().setUser(null);
      } finally {
        authStore.getState().setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (location.pathname !== "/" && !hasSession) {
    return <Navigate to="/" state={{ from: location }} replace />;
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
