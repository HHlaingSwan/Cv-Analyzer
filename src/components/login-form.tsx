"use client";

import React from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { OtpVerification } from "@/components/otp-verification";
import {
  Loader2,
  ArrowRight,
  FileText,
  Brain,
  BarChart3,
  TrendingUp,
  Sparkles,
  Eye,
  EyeOff,
} from "lucide-react";

export function LoginForm() {
  const [mode, setMode] = React.useState<"login" | "signup" | "magiclink">(
    "login",
  );
  const [showOtp, setShowOtp] = React.useState(false);
  const [otpEmail, setOtpEmail] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const {
    login,
    signup,
    signInWithOAuth,
    signInWithMagicLink,
    verifyOtp,
    isLoading,
  } = useAuth();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      if (mode === "signup") {
        await signup(email, password);
        setShowOtp(true);
        setOtpEmail(email);
        toast.success(
          "OTP sent to your email. Please enter the code to verify.",
        );
      } else if (mode === "magiclink") {
        await signInWithMagicLink(email);
        toast.success(
          "Magic link sent to your email. Click the link to sign in.",
        );
      } else {
        await login(email, password);
        toast.success("Login successful!");
        window.location.href = "/";
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Authentication failed",
      );
    }
  }

  const handleOtpSuccess = () => {
    toast.success("Account verified successfully!");
    window.location.href = "/";
  };

  async function handleOAuth() {
    try {
      await signInWithOAuth("google");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "OAuth failed");
    }
  }

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_right,#00000060,transparent)]"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/10 rounded-full blur-[128px]"></div>

      <div className="relative z-10 min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8 gap-8 lg:gap-16">
        {/* Left Side - Branding */}
        <div className="w-full lg:w-1/2 max-w-lg lg:max-w-xl space-y-8 text-center lg:text-left">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-semibold">
              <Brain className="h-4 w-4" />
              AI-Powered Platform
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
              <span className="text-foreground dark:text-white">
                Analyze CVs with
              </span>
              <br />
              <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                AI Precision
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0 leading-relaxed">
              Transform your hiring workflow with intelligent CV analysis.
              Extract insights, match candidates, and make better decisions
              faster.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <FeatureCard
              icon={<FileText className="h-5 w-5" />}
              title="Smart Parsing"
              description="Extract data from any CV format"
            />
            <FeatureCard
              icon={<BarChart3 className="h-5 w-5" />}
              title="Deep Analysis"
              description="AI-driven candidate insights"
            />
            <FeatureCard
              icon={<TrendingUp className="h-5 w-5" />}
              title="Better Hiring"
              description="Make data-driven decisions"
            />
          </div>
        </div>

        {/* Right Side - Auth Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/40">
            <div className="space-y-8">
              {showOtp ? (
                <OtpVerification
                  email={otpEmail}
                  onSuccess={handleOtpSuccess}
                />
              ) : (
                <>
                  {/* Tabs */}
                  <div className="flex justify-around items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setMode("login")}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        mode === "login"
                          ? "bg-white dark:bg-slate-700 text-foreground dark:text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("signup")}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        mode === "signup"
                          ? "bg-white dark:bg-slate-700 text-foreground dark:text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      Sign Up
                    </button>
                    <button
                      type="button"
                      onClick={() => setMode("magiclink")}
                      className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                        mode === "magiclink"
                          ? "bg-white dark:bg-slate-700 text-foreground dark:text-white shadow-sm"
                          : "text-muted-foreground hover:text-foreground dark:hover:text-white"
                      }`}
                    >
                      Magic Link
                    </button>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground dark:text-white">
                      {mode === "login"
                        ? "Welcome back"
                        : mode === "signup"
                          ? "Create account"
                          : "Magic Link Login"}
                    </h2>
                    <p className="text-muted-foreground">
                      {mode === "login"
                        ? "Sign in to access your Review Cv dashboard"
                        : mode === "signup"
                          ? "Start analyzing CVs in minutes"
                          : "Sign in with a magic link sent to your email"}
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-foreground/80 dark:text-slate-300"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="name@company.com"
                          required
                          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
                        />
                      </div>

                      {mode !== "magiclink" && (
                        <div className="space-y-2">
                          <label
                            htmlFor="password"
                            className="text-sm font-medium text-foreground/80 dark:text-slate-300"
                          >
                            Password
                          </label>
                          <div className="relative">
                            <input
                              id="password"
                              name="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              required
                              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500 pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-foreground dark:hover:text-white transition-colors"
                            >
                              {showPassword ? (
                                <EyeOff className="h-5 w-5" />
                              ) : (
                                <Eye className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <>
                          <span>
                            {mode === "login" ? "Sign In" : "Create Account"}
                          </span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Divider */}
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white dark:bg-slate-900 px-4 text-muted-foreground">
                        or continue with
                      </span>
                    </div>
                  </div>

                  {/* Social Buttons */}
                  <div className="flex justify-center w-full gap-3">
                    <button
                      onClick={handleOAuth}
                      disabled={isLoading}
                      className="w-full flex items-center justify-center gap-2 p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <div className="w-5 h-5">
                        <GoogleIcon />
                      </div>
                      <span>Continue with Google</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>256-bit encryption</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3" />
              <span>SOC 2 compliant</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-5 hover:bg-white dark:hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-950/5 dark:hover:shadow-slate-950/20 transition-all duration-300">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-3 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="font-semibold text-sm text-foreground dark:text-white mb-1">
        {title}
      </h3>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-full w-full">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1 .67-2.28 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.67-.35-1.39-.35-2.09s.13-1.42.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}
