import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth-store';

export function useAuth() {
  const {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    initialize,
    login,
    signup,
    logout,
    signInWithOAuth,
  } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return {
    user,
    session,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    signInWithOAuth,
  };
}
