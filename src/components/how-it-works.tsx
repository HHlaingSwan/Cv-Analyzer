"use client";

import React from "react";
import {
  Upload,
  FileText,
  Brain,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Upload CV",
    description:
      "Drag & drop or select your CV file. We support PDF, DOCX, and TXT formats.",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Add Job Details",
    description:
      "Enter the job title, position, description, and key responsibilities for comparison.",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Analysis",
    description:
      "Our AI automatically compares your CV against the job requirements and generates insights.",
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Get Feedback",
    description:
      "Receive a structured report with actionable insights, skill gaps, and optimization tips.",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-semibold">
            <Sparkles className="h-4 w-4" />
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} {...step} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground h-12 px-8 rounded-xl font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/25">
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function StepCard({
  icon,
  title,
  description,
  color,
  gradient,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  gradient: string;
  index: number;
}) {
  return (
    <div className="relative group">
      {/* Connector Line */}
      {index < 3 && (
        <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-linear-to-r from-slate-200 to-transparent dark:from-slate-700 dark:to-transparent" />
      )}

      {/* Card */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-slate-950/10 dark:hover:shadow-slate-950/30 transition-all duration-300 hover:-translate-y-1">
        {/* Step Number Badge */}
        <div className="absolute -top-3 -left-3 h-8 w-8 rounded-full bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white text-sm font-bold shadow-lg">
          {index + 1}
        </div>

        {/* Icon */}
        <div
          className={`h-12 w-12 rounded-xl ${color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-foreground dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
