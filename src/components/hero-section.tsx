"use client";

import React from "react";
import { ArrowRight, Sparkles, FileText, Brain } from "lucide-react";
import Link from "next/link";

interface HeroSectionProps {
  userType: "recruiter" | "jobseeker";
}

export function HeroSection({ userType }: HeroSectionProps) {
  const content = {
    recruiter: {
      headline: "Find the Perfect Candidate with AI-Powered CV Analysis",
      subheadline:
        "Transform your hiring workflow with intelligent CV analysis. Extract insights, match candidates, and make better decisions faster.",
      primaryCTA: "Start Analyzing CVs",
      secondaryCTA: "See How It Works",
    },
    jobseeker: {
      headline: "Optimize Your CV and view your chances for Your Dream Job",
      subheadline:
        "Get AI-powered feedback to improve your CV. Analyze job descriptions, identify skill gaps, and stand out from the competition.",
      primaryCTA: "Optimize My CV",
      secondaryCTA: "See How It Works",
    },
  };

  const current = content[userType];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[linear-gradient(to_right,#00000060,transparent)]"></div>

      {/* Floating Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-purple-500/10 rounded-full blur-[128px]"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-semibold animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sparkles className="h-4 w-4" />
            AI-Powered CV Analysis
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.1] animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            <span className="text-foreground dark:text-white">
              {current.headline}
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {current.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25"
            >
              {current.primaryCTA}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <button className="w-full sm:w-auto bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-foreground dark:text-white h-12 px-8 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] border border-slate-200 dark:border-slate-700">
              {current.secondaryCTA}
            </button>
          </div>

          {/* Visual Mockup */}
          <div className="mt-16 relative animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400">
            <div className="relative mx-auto max-w-4xl">
              {/* Glass Card */}
              <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 rounded-3xl p-8 shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/40">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* CV Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="h-4 w-32 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-3 w-5/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                      <div className="h-3 w-4/6 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-6 w-16 bg-primary/10 rounded-full animate-pulse"></div>
                      <div className="h-6 w-20 bg-blue-500/10 rounded-full animate-pulse"></div>
                      <div className="h-6 w-14 bg-purple-500/10 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Analysis Side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
                        <Brain className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="h-4 w-28 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-24 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-green-500/20 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-28 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-blue-500/20 rounded animate-pulse"></div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="h-3 w-20 bg-slate-100 dark:bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-3 w-12 bg-purple-500/20 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="h-20 bg-linear-to-r from-primary/5 to-blue-500/5 rounded-xl border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center">
                      <div className="text-sm text-muted-foreground">
                        AI Analysis
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div
                className="absolute -top-4 -right-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl animate-bounce"
                style={{ animationDuration: "3s" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                    92%
                  </div>
                  <div className="text-sm font-semibold text-foreground dark:text-white">
                    Match
                  </div>
                </div>
              </div>
              <div
                className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl animate-bounce"
                style={{ animationDuration: "3s", animationDelay: "1.5s" }}
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <div className="text-sm font-semibold text-foreground dark:text-white">
                    AI Ready
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
