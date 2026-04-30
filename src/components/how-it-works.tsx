"use client";

import React from "react";
import { Upload, FileText, Brain, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: <Upload className="h-6 w-6" />,
    title: "Upload CV",
    description:
      "Drag & drop or select your CV file. We support PDF, DOCX, and TXT formats.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Add Job Details",
    description:
      "Enter the job title, position, description, and key responsibilities for comparison.",
  },
  {
    icon: <Brain className="h-6 w-6" />,
    title: "AI Analysis",
    description:
      "Our AI automatically compares your CV against the job requirements and generates insights.",
  },
  {
    icon: <CheckCircle2 className="h-6 w-6" />,
    title: "Get Feedback",
    description:
      "Receive a structured report with actionable insights, skill gaps, and optimization tips.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground dark:text-white">
            How It
            <span className="bg-linear-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              {" "}
              Works
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started in minutes with our simple 4-step process.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <StepCard key={index} {...step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepCard({
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
    <div className="relative">
      {/* Step Number */}
      <div className="absolute -top-4 -left-4 h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg shadow-lg z-10">
        {index + 1}
      </div>

      {/* Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 pt-8 h-full hover:shadow-xl hover:shadow-slate-950/5 dark:hover:shadow-slate-950/20 transition-all duration-300">
        <div className="h-14 w-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-foreground dark:text-white mb-3">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
