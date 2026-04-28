"use client";

import React from "react";
import { Briefcase, User } from "lucide-react";

interface UserTypeToggleProps {
  userType: "recruiter" | "jobseeker";
  onUserTypeChange: (type: "recruiter" | "jobseeker") => void;
}

export function UserTypeToggle({
  userType,
  onUserTypeChange,
}: UserTypeToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-linear-to-b from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-800/70 backdrop-blur-2xl rounded-full p-1.5 shadow-2xl border border-white/50 dark:border-slate-600/50">
        <button
          onClick={() => onUserTypeChange("recruiter")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
            userType === "recruiter"
              ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
          }`}
        >
          <Briefcase className="h-4 w-4" />
          <span className="text-sm">Recruiters</span>
        </button>
        <button
          onClick={() => onUserTypeChange("jobseeker")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 ${
            userType === "jobseeker"
              ? "bg-linear-to-r from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/30"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
          }`}
        >
          <User className="h-4 w-4" />
          <span className="text-sm">Job Seekers</span>
        </button>
      </div>
    </div>
  );
}
