"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Zap,
  Database,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function DocsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">
            Documentation
          </h1>
          <p className="text-muted-foreground">
            Learn how to use CV Analyzer effectively
          </p>
        </div>

        <div className="space-y-8">
          {/* How to Use */}
          <section className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">
                How to Use CV Analyzer
              </h2>
            </div>
            <div className="space-y-4 text-foreground dark:text-white">
              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <p className="font-medium">Sign In</p>
                  <p className="text-sm text-muted-foreground">
                    Sign in with your Google account to get started
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <p className="font-medium">Upload Your CV</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your CV in PDF format along with the job title and
                    description
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <p className="font-medium">Review Analysis</p>
                  <p className="text-sm text-muted-foreground">
                    Get detailed feedback including skills matching, strengths,
                    weaknesses, and recommendations
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <p className="font-medium">Improve Your CV</p>
                  <p className="text-sm text-muted-foreground">
                    Use the recommendations to optimize your CV for better job
                    matching
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Usage Limits */}
          <section className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Zap className="h-5 w-5 text-yellow-500" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">
                Usage Limits
              </h2>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-foreground dark:text-white mb-2">
                  Daily Analysis Limit
                </p>
                <p className="text-sm text-muted-foreground">
                  You can analyze up to <strong>5 CVs per day</strong>. This
                  limit resets at midnight UTC.
                </p>
              </div>
              <div className="p-4 bg-muted rounded-lg">
                <p className="font-medium text-foreground dark:text-white mb-2">
                  History Storage Limit
                </p>
                <p className="text-sm text-muted-foreground">
                  You can store up to{" "}
                  <strong>10 analyses in your history</strong>. When you reach
                  this limit, you must delete old analyses before creating new
                  ones.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <HelpCircle className="h-5 w-5 text-blue-500" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  What file formats are supported?
                </p>
                <p className="text-sm text-muted-foreground">
                  Currently, only PDF files are supported for CV uploads.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  How accurate is the AI analysis?
                </p>
                <p className="text-sm text-muted-foreground">
                  The AI provides insights based on the job description and CV
                  content. Use it as a guide to improve your CV, but always
                  review the suggestions carefully.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  Is my data secure?
                </p>
                <p className="text-sm text-muted-foreground">
                  Yes, your CVs are stored securely in Supabase Storage with Row
                  Level Security policies. Only you can access your uploaded
                  files and analyses.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  Can I delete my analyses?
                </p>
                <p className="text-sm text-muted-foreground">
                  Yes, you can delete any analysis from your history page. This
                  will free up space for new analyses.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-foreground dark:text-white">
                Troubleshooting
              </h2>
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  Analysis failed to complete
                </p>
                <p className="text-sm text-muted-foreground">
                  Make sure your PDF is not corrupted and contains readable
                  text. Try uploading a different PDF if the issue persists.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  PDF preview not loading
                </p>
                <p className="text-sm text-muted-foreground">
                  The PDF preview uses react-pdf. If it doesn&apos;t load, try
                  refreshing the page or using a different browser.
                </p>
              </div>
              <div>
                <p className="font-medium text-foreground dark:text-white mb-1">
                  Reached daily limit
                </p>
                <p className="text-sm text-muted-foreground">
                  Wait until midnight UTC when your daily limit resets, or come
                  back tomorrow to analyze more CVs.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
