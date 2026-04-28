import { create } from 'zustand';
import { createClient } from '@/lib/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface AuthActions {
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  initialize: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signInWithOAuth: (provider: 'google') => Promise<void>;
}

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  session: null,
  loading: false,
  error: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  reset: () => set({
    user: null,
    session: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  }),

  initialize: async () => {
    set({ loading: true });
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        set({
          user: session.user,
          session,
          isAuthenticated: true,
        });
      }

      // Listen for auth changes
      supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          set({
            user: session.user,
            session,
            isAuthenticated: true,
          });
        } else {
          set({
            user: null,
            session: null,
            isAuthenticated: false,
          });
        }
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to initialize auth' });
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user && data.session) {
        set({
          user: data.user,
          session: data.session,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Login failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signup: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.user && data.session) {
        set({
          user: data.user,
          session: data.session,
          isAuthenticated: true,
        });
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Signup failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) throw error;

      set({
        user: null,
        session: null,
        isAuthenticated: false,
      });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Logout failed' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  signInWithOAuth: async (provider) => {
    set({ loading: true, error: null });
    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
        },
      });

      if (error) throw error;

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'OAuth sign in failed' });
      set({ loading: false });
      throw error;
    }
  },
}));
