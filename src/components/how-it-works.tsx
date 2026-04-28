"use client";

import React from "react";
import {
  Upload,
  FileText,
  Brain,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-8 w-8" />,
    title: "Upload CV",
    description:
      "Drag & drop or select your CV file. We support PDF, DOCX, and TXT formats.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: "Add Job Details",
    description:
      "Enter the job title, position, description, and key responsibilities for comparison.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: <Brain className="h-8 w-8" />,
    title: "AI Analysis",
    description:
      "Our AI automatically compares your CV against the job requirements and generates insights.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "Get Feedback",
    description:
      "Receive a structured report with actionable insights, skill gaps, and optimization tips.",
    color: "from-green-500 to-emerald-500",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-linear-to-b from-slate-50 to-white dark:from-slate-900/50 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 dark:bg-primary/20 border border-primary/20 text-primary text-sm font-semibold mb-4">
            Simple Process
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground dark:text-white">
            How It
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  index: number;
}) {
  return (
    <div className="group relative">
      {/* Card */}
      <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 h-full hover:shadow-2xl hover:shadow-slate-950/10 dark:hover:shadow-slate-950/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
        {/* Gradient Background on Hover */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        ></div>

        {/* Step Number */}
        <div
          className={`absolute top-6 right-6 text-6xl font-black bg-linear-to-br ${color} bg-clip-text text-transparent opacity-10`}
        >
          {index + 1}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Icon */}
          <div
            className={`h-16 w-16 rounded-2xl bg-linear-to-br ${color} flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}
          >
            {icon}
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-foreground dark:text-white mb-3 group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>

        {/* Arrow Indicator */}
        <div className="absolute bottom-6 right-6 h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 translate-x-2">
          <ArrowRight className="h-4 w-4 text-primary" />
        </div>
      </div>
    </div>
  );
}
