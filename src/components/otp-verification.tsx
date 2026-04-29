"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, ArrowRight } from "lucide-react";

interface OtpVerificationProps {
  email: string;
  onSuccess: () => void;
}

export function OtpVerification({ email, onSuccess }: OtpVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const { verifyOtp, signInWithMagicLink, isLoading } = useAuth();

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[0];
    }
    if (!/^\d*$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(
        `otp-${index + 1}`,
      ) as HTMLInputElement;
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(
        `otp-${index - 1}`,
      ) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");

    if (code.length !== 6) {
      toast.error("Please enter the 6-digit code");
      return;
    }

    try {
      await verifyOtp(email, code);
      toast.success("Email verified successfully!");
      onSuccess();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Verification failed",
      );
    }
  };

  const handleResend = async () => {
    try {
      await signInWithMagicLink(email);
      toast.success("New code sent to your email");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend code",
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-xl font-bold text-foreground dark:text-white">
          Verify your email
        </h3>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to {email}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-2xl font-bold bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
              disabled={isLoading}
            />
          ))}
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
              <span>Verify</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={handleResend}
          disabled={isLoading}
          className="text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50"
        >
          Resend code
        </button>
      </div>
    </div>
  );
}
