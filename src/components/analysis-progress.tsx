"use client";

import React, { useEffect, useState } from "react";
import { Loader2, CheckCircle2, Upload, Sparkles } from "lucide-react";

interface AnalysisProgressProps {
  onComplete: (analysisId: string) => void;
  isAnalyzing: boolean;
}

const steps = [
  { id: 1, label: "Uploading CV...", icon: Upload },
  { id: 2, label: "Reading and analyzing CV...", icon: Sparkles },
  { id: 3, label: "Generating insights...", icon: CheckCircle2 },
];

export function AnalysisProgress({
  onComplete,
  isAnalyzing,
}: AnalysisProgressProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStep(0);
      return;
    }

    const intervals = [2000, 3000, 4000, 2000];
    let totalDelay = 0;

    intervals.forEach((delay, index) => {
      totalDelay += delay;
      setTimeout(() => {
        if (index < steps.length - 1) {
          setCurrentStep(index + 1);
        }
      }, totalDelay);
    });

    // Simulate completion after all steps
    setTimeout(() => {
      // This would normally receive the actual analysisId from the parent
      onComplete("pending");
    }, totalDelay);
  }, [isAnalyzing, onComplete]);

  if (!isAnalyzing) return null;

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary mb-4" />
          <h2 className="text-2xl font-bold text-foreground dark:text-white mb-2">
            Analyzing Your CV
          </h2>
          <p className="text-muted-foreground">
            Please wait while we process your CV...
          </p>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                  isCompleted
                    ? "bg-green-50 dark:bg-green-950/20"
                    : isCurrent
                      ? "bg-primary/10 dark:bg-primary/20"
                      : "bg-muted/50"
                }`}
              >
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted
                      ? "bg-green-500 text-white"
                      : isCurrent
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : isCurrent ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <StepIcon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      isCompleted
                        ? "text-green-700 dark:text-green-400"
                        : isCurrent
                          ? "text-foreground dark:text-white"
                          : "text-muted-foreground"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
