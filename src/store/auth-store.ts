import { create } from "zustand";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  initialize: () => Promise<(() => void) | undefined>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithOAuth: (provider: "google") => Promise<void>;
  signInWithMagicLink: (email: string) => Promise<void>;
  verifyOtp: (email: string, token: string) => Promise<void>;
}

const initialState = {
  user: null,
  session: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthState>((set, get) => ({
  ...initialState,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  reset: () => set(initialState),

  initialize: async () => {
    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        set({
          user: session.user,
          session,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        set({
          user: null,
          session: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }

      // Listen to auth state changes
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session) {
          set({
            user: session.user,
            session,
            isAuthenticated: true,
            isLoading: false,
          });
        } else {
          set({
            user: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          });
        }
      });

      return () => subscription.unsubscribe();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to initialize auth",
        isLoading: false,
      });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Login failed",
        isLoading: false,
      });
      throw error;
    }
  },

  signup: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: !!data.session,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Signup failed",
        isLoading: false,
      });
      throw error;
    }
  },

  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({
        user: null,
        session: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Logout failed",
        isLoading: false,
      });
      throw error;
    }
  },

  signInWithOAuth: async (provider: "google") => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "OAuth failed",
        isLoading: false,
      });
      throw error;
    }
  },

  signInWithMagicLink: async (email: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/auth/callback`,
        },
      });

      if (error) throw error;

      set({ isLoading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Magic link failed",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyOtp: async (email: string, token: string) => {
    try {
      set({ isLoading: true, error: null });
      const supabase = createClient();
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: "signup",
      });

      if (error) throw error;

      set({
        user: data.user,
        session: data.session,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "OTP verification failed",
        isLoading: false,
      });
      throw error;
    }
  },
}));
