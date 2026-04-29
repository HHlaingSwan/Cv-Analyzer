import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function useAuth() {
  const {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout,
    signInWithOAuth,
    signInWithMagicLink,
    verifyOtp,
    reset,
  } = useAuthStore();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    initialize().then((cleanup) => {
      unsubscribe = cleanup;
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [initialize]);

  return {
    user,
    session,
    isLoading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    signInWithOAuth,
    signInWithMagicLink,
    verifyOtp,
    reset,
  };
}
