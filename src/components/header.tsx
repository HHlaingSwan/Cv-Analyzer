"use client";

import React from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import { LogoutButton } from "@/components/logout-button";
import { Brain, Menu, X } from "lucide-react";

export function Header() {
  const { isAuthenticated, user, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

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
              CV Analyzer
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium text-foreground/80 dark:text-slate-300 hover:text-foreground dark:hover:text-white transition-colors"
            >
              Home
            </Link>
            {isAuthenticated && (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-foreground/80 dark:text-slate-300 hover:text-foreground dark:hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            )}
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {loading ? (
              <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
            ) : isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                  <span className="text-sm text-foreground dark:text-white">
                    {user?.email?.split("@")[0]}
                  </span>
                </div>
                <LogoutButton />
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 rounded-lg font-semibold text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5 text-foreground dark:text-white" />
            ) : (
              <Menu className="h-5 w-5 text-foreground dark:text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm font-medium text-foreground/80 dark:text-slate-300 hover:text-foreground dark:hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {isAuthenticated && (
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-foreground/80 dark:text-slate-300 hover:text-foreground dark:hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}
            </nav>
            <div className="pt-4 border-t border-slate-200/50 dark:border-slate-700/50">
              {loading ? (
                <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
              ) : isAuthenticated ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold">
                      {user?.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="text-sm text-foreground dark:text-white">
                      {user?.email?.split("@")[0]}
                    </span>
                  </div>
                  <LogoutButton />
                </div>
              ) : (
                <Link
                  href="/login"
                  className="block w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 px-4 rounded-lg font-semibold text-sm transition-all text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
