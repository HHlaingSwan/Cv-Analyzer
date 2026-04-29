"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Brain, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export function Header() {
  const { isAuthenticated, isLoading, user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200/50 dark:border-slate-700/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Brain className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground dark:text-white">
              Review Cv
            </span>
          </Link>

          {/* Auth Button */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            ) : isAuthenticated ? (
              <button
                onClick={async () => {
                  try {
                    await logout();
                    toast.success("Logged out successfully");
                    window.location.href = "/";
                  } catch (error) {
                    toast.error(
                      error instanceof Error ? error.message : "Logout failed",
                    );
                  }
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-foreground dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
                <LogOut className="h-4 w-4" />
              </button>
            ) : (
              <Link
                href="/login"
                className="bg-primary flex items-center justify-center hover:bg-primary/90 text-primary-foreground h-9 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
