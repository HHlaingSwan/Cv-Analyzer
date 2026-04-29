"use client";

import { Briefcase, User } from "lucide-react";

interface UserTypeToggleProps {
  userType: "jobseeker" | "recruiter";
  onUserTypeChange: (type: "recruiter" | "jobseeker") => void;
}

export function UserTypeToggle({
  userType,
  onUserTypeChange,
}: UserTypeToggleProps) {
  return (
    <div className="flex items-center justify-center">
      <div className="inline-flex bg-linear-to-b from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-800/70 backdrop-blur-2xl rounded-full p-1.5 shadow-2xl border border-white/50 dark:border-slate-600/50 relative">
        {/* Sliding background */}
        <div
          className={`absolute top-1.5 bottom-1.5 rounded-full transition-all duration-500 ease-in-out ${
            userType === "jobseeker"
              ? "left-1.5 w-[calc(50%-6px)] bg-linear-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/30"
              : "right-1.5 w-[calc(50%-6px)] bg-linear-to-r from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30"
          }`}
        />
        <button
          onClick={() => onUserTypeChange("jobseeker")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 relative z-10 ${
            userType === "jobseeker"
              ? "text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
          }`}
        >
          <User className="h-4 w-4 transition-transform duration-300" />
          <span className="text-sm transition-opacity duration-300">
            Job Seekers
          </span>
        </button>
        <button
          onClick={() => onUserTypeChange("recruiter")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 hover:scale-105 relative z-10 ${
            userType === "recruiter"
              ? "text-white"
              : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
          }`}
        >
          <Briefcase className="h-4 w-4 transition-transform duration-300" />
          <span className="text-sm transition-opacity duration-300">
            Recruiters
          </span>
        </button>
      </div>
    </div>
  );
}
