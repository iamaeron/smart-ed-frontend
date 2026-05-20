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
      try {
        const response = await api.get("/api/user");

        setHasSession(true);
        authStore.getState().setUser(response.data);
      } catch (error) {
        setHasSession(false);
        console.log("No valid session cookie found, user is a guest.");
        authStore.getState().setUser(null);
      } finally {
        authStore.getState().setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  if (!hasSession) {
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
