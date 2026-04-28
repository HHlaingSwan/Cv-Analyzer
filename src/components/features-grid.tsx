"use client";

import React from "react";
import {
  Target,
  ShieldCheck,
  Brain,
  FileText,
  MessageSquare,
  Upload,
} from "lucide-react";

const features = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Smart Skills Matching",
    description:
      "Compare CV skills against job description requirements with visual skill gap analysis and match percentage scores.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: "ATS Compatibility Score",
    description:
      "Check CV against ATS systems with optimization suggestions and format recommendations to ensure you pass automated filters.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI-Powered Insights",
    description:
      "Get comprehensive experience assessment, formatting feedback, and content quality analysis powered by advanced AI.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Job Description Analysis",
    description:
      "Extract key responsibilities, identify required skills, and highlight qualifications from any job posting.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Structured Feedback UI",
    description:
      "Receive clear, actionable recommendations with color-coded severity levels and before/after comparisons.",
  },
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Multi-Format Support",
    description:
      "Parse PDF, DOCX, TXT files with bulk upload for recruiters and export reports for easy sharing.",
  },
];

export function FeaturesGrid() {
  return (
    <section className="py-24 bg-white dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white">
            Powerful Features for
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              Smart Hiring
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze CVs, match candidates, and make
            data-driven hiring decisions.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <div
      className="group bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-950/5 dark:hover:shadow-slate-950/20 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      <div className="h-14 w-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}
